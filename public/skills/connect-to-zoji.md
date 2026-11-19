---
name: connect-to-zoji
description: Conectar um agente de IA à conta de um usuário do Zoji (OAuth 2.1 + PKCE) e ler contatos, conversas e grupos, ver o status dos amigos, enviar mensagens individuais ou em grupo (com confirmação em 2 passos) ou definir o status, via MCP, sem usar a sessão do app.
---

# Conectar ao Zoji

Use esta skill quando um usuário pedir para você ler contatos, ler mensagens
(individuais ou de grupo), ver o status dos amigos, enviar uma mensagem por ele
ou mudar o status dele no Zoji (app de mensagens só com emojis).

## Pré-requisito: conexão já autorizada?

Se você ainda não tem um `access_token` válido para este usuário, siga
`https://zoji.app/auth.md` para completar o fluxo OAuth 2.1 + PKCE
(Dynamic Client Registration → autorização → troca de código por token).
O usuário precisa aprovar a conexão uma vez, na tela de consentimento em
`zoji.app/oauth/authorize` (login por OTP).

## Uso

Com o `access_token` em mãos, conecte um MCP client (Streamable HTTP) em:

```
https://mcp.zoji.app/mcp
Authorization: Bearer <access_token>
```

Tools de leitura:

- `list_contacts` — lista os contatos aceitos do usuário (`contact_id`, `nickname`, `profile_emoji`). Escopo `contacts:read`.
- `search_contact({ name })` — busca um contato pelo nome (busca aproximada local). Escopo `contacts:read`.
- `get_friends_status()` — status atual (um emoji, some em 24h) dos contatos que
  têm um ativo agora, e o do próprio usuário. Não é a lista completa de
  contatos. Escopo `contacts:read`.
- `get_conversation({ contact_id, limit? })` — lê as mensagens de uma conversa,
  da mais antiga pra mais nova. Cada mensagem tem `sender_id`, `receiver_id`,
  `emoji` (a mensagem em si — sequência de até 4 emojis, é assim que o Zoji
  funciona, não há texto), `read_at` (null = não lida). Escopo `messages:read`.
- `list_groups()` — grupos dos quais o usuário faz parte (`group_id`, nome,
  emoji, papel `admin`/`member`), sem mensagens. Escopo `groups:read` ou `groups:send`.
- `get_group_conversation({ group_id, limit? })` — lê as mensagens de um grupo.
  Escopo `groups:read`.

Tools de envio, **sempre em 2 passos**:

- Individual (escopo `messages:send`): `prepare_message({ contact_id, emoji, sender_emoji? })`
  e depois `send_message({ confirmation_token })`.
- Em grupo (escopo `groups:send`): `prepare_group_message({ group_id, emoji, sender_emoji? })`
  e depois `send_group_message({ confirmation_token })`.

O `prepare_*` valida tudo e devolve um preview + `confirmation_token` de uso
único (válido ~2 min). Nada é enviado ainda. O `send_*` envia de fato.

**Nunca chame `send_message` ou `send_group_message` sem antes mostrar o preview
ao usuário humano e receber confirmação explícita dele.** Isso não é opcional — é a
única forma de garantir que uma mensagem só sai com aprovação humana.

Tool de status (exige escopo `status:write`), escrita direta, sem confirmação em
2 passos — só afeta o próprio perfil do usuário, não envia nada a ninguém:

- `set_status({ emoji })` — define um único emoji como status atual do usuário,
  visível aos contatos aceitos. Substitui o status anterior e expira sozinho em 24h.
- `clear_status()` — remove o status atual antes da expiração automática.

## Limitações importantes

- Nunca chame nada que "marque como lida" — no Zoji isso apaga a mensagem do
  servidor do outro usuário, então a tool `get_conversation` nunca faz isso.
- O token é escopado (`contacts:read`, `messages:read`, `messages:send`,
  `groups:read`, `groups:send`, `status:write`) e revogável pelo usuário a qualquer momento em Configurações →
  Agentes conectados, no app. Se uma chamada retornar 401, o token expirou ou foi
  revogado — reinicie o fluxo de autorização.
- Envio via agente tem limite diário; se `prepare_message` ou
  `prepare_group_message` retornar limite atingido, não insista — informe o usuário.
- Um token com só `groups:send` envia em grupo mas não lê as mensagens dele
  (isso exige `groups:read`).
