# auth.md — Autenticação de agentes de IA no Zoji

O Zoji permite que um agente de IA (ex: Claude) se conecte à conta de um
usuário para ler contatos, conversas e grupos, enviar mensagens (sempre com
confirmação humana) e definir o status em seu nome, usando um token OAuth
próprio — escopado e revogável a qualquer momento — nunca a sessão do app.

## Fluxo completo (exemplo autocontido)

### 1. Registro do agente (Dynamic Client Registration, RFC 7591)

```
curl -X POST https://api.zoji.app/oauth/register \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "Meu Agente",
    "redirect_uris": ["https://meu-agente.example.com/callback"]
  }'
```

Resposta:

```json
{
  "client_id": "9f1c2e7a4b6d4f2e8a1c0d3e5f7a9b1c",
  "client_name": "Meu Agente",
  "redirect_uris": ["https://meu-agente.example.com/callback"],
  "token_endpoint_auth_method": "none",
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"]
}
```

Não há `client_secret` — o fluxo é público (PKCE, RFC 7636).

### 2. Gerar o par PKCE

```
code_verifier  = dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
code_challenge = E9Melhoq2CQZ5eIzMTF_bPBFVpNr3EPr2SkkuKtiZgo   # BASE64URL(SHA256(code_verifier))
```

### 3. Redirecionar o usuário para autorizar

```
https://zoji.app/oauth/authorize
  ?client_id=9f1c2e7a4b6d4f2e8a1c0d3e5f7a9b1c
  &redirect_uri=https%3A%2F%2Fmeu-agente.example.com%2Fcallback
  &code_challenge=E9Melhoq2CQZ5eIzMTF_bPBFVpNr3EPr2SkkuKtiZgo
  &code_challenge_method=S256
  &scope=contacts%3Aread%20messages%3Aread%20messages%3Asend%20groups%3Aread
  &state=xyz123
```

O usuário faz login (OTP) e aprova ou nega o acesso. Em caso de aprovação, o
Zoji redireciona para `redirect_uri` com `?code=<código>&state=xyz123`.

### 4. Trocar o código por um token

```
curl -X POST https://api.zoji.app/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=<código recebido no passo 3>" \
  -d "redirect_uri=https://meu-agente.example.com/callback" \
  -d "code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk" \
  -d "client_id=9f1c2e7a4b6d4f2e8a1c0d3e5f7a9b1c"
```

Resposta:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "8b3e...c1a2",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "contacts:read messages:read messages:send groups:read"
}
```

### 5. Renovar e revogar

```
curl -X POST https://api.zoji.app/oauth/token \
  -d "grant_type=refresh_token" -d "refresh_token=<refresh_token>" -d "client_id=<client_id>"

curl -X POST https://api.zoji.app/oauth/revoke \
  -d "refresh_token=<refresh_token>" -d "client_id=<client_id>"
```

(RFC 7009 — revogação idempotente.) O usuário também pode revogar a
qualquer momento em Configurações → Agentes conectados, dentro do app.

## Escopos disponíveis

Peça só os escopos de que o agente realmente precisa — o usuário vê cada um
na tela de consentimento, e os de escrita aparecem destacados.

| Escopo           | Permite                                                        | Tools MCP |
|------------------|----------------------------------------------------------------|-----------|
| `contacts:read`  | Listar contatos aceitos e ver o status (emoji) atual deles     | `list_contacts`, `search_contact`, `get_friends_status` |
| `messages:read`  | Ler mensagens de uma conversa individual                       | `get_conversation` |
| `messages:send`  | Enviar mensagens individuais (fluxo de 2 passos, ver abaixo)   | `prepare_message`, `send_message` |
| `groups:read`    | Listar os grupos do usuário e ler as mensagens deles           | `list_groups`, `get_group_conversation` |
| `groups:send`    | Listar os grupos e enviar mensagens neles (2 passos). Não inclui ler mensagens nem administrar o grupo | `list_groups`, `prepare_group_message`, `send_group_message` |
| `status:write`   | Definir/remover o status (emoji) do próprio usuário            | `set_status`, `clear_status` |

A lista oficial fica em `scopes_supported` nos metadados de descoberta abaixo.

## Metadados de descoberta

- Authorization Server Metadata (RFC 8414): `https://api.zoji.app/.well-known/oauth-authorization-server`
- Protected Resource Metadata (RFC 9728): `https://mcp.zoji.app/.well-known/oauth-protected-resource`
- MCP Server Card: `https://mcp.zoji.app/.well-known/mcp/server-card.json`

## Servidor MCP

Depois de obter o `access_token`, conecte um MCP client (Streamable HTTP) em:

```
https://mcp.zoji.app/mcp
Authorization: Bearer <access_token>
```

Tools de leitura:

- `list_contacts`, `search_contact({ name })` (escopo `contacts:read`)
- `get_friends_status()` — status atual dos contatos que têm um ativo agora, e o
  do próprio usuário (escopo `contacts:read`)
- `get_conversation({ contact_id, limit? })` (escopo `messages:read`)
- `list_groups()` — grupos do usuário, com `group_id`, nome, emoji e papel
  (escopo `groups:read` ou `groups:send`)
- `get_group_conversation({ group_id, limit? })` (escopo `groups:read`)

Tools de envio, sempre em **2 passos obrigatórios** — individual (escopo
`messages:send`) ou em grupo (escopo `groups:send`):

1. `prepare_message({ contact_id, emoji, sender_emoji? })` ou
   `prepare_group_message({ group_id, emoji, sender_emoji? })` — valida tudo
   (bloqueios, consentimento, ser membro ativo e não silenciado no grupo, limite
   diário) e devolve um preview + um `confirmation_token` de uso único, válido
   por 2 minutos. Nada é enviado ainda.
2. `send_message({ confirmation_token })` ou
   `send_group_message({ confirmation_token })` — efetivamente envia. Um agente
   **nunca** deve chamar estas tools sem antes mostrar o preview ao usuário
   humano e receber confirmação explícita dele.

Essa confirmação em 2 passos é garantida pelo próprio zoji-api (o
`confirmation_token` é de uso único, expira rápido e só pode ser confirmado pelo
mesmo agente que o gerou) — não depende do MCP client respeitar a instrução acima.

Tool de status (escopo `status:write`), escrita direta sem confirmação em 2 passos
— só afeta o próprio perfil do usuário:

- `set_status({ emoji })` — define um único emoji como status atual, visível aos
  contatos aceitos. Substitui o status anterior e expira sozinho em 24h.
- `clear_status()` — remove o status atual antes da expiração automática.
