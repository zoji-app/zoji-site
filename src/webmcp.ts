// WebMCP (draft: https://webmachinelearning.github.io/webmcp/) — expõe ações
// do site pra agentes de IA rodando no browser do usuário. API ainda
// experimental, por isso o guard de feature-detection antes de chamar.
interface WebMcpTool {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (input: Record<string, unknown>) => Promise<{ content: Array<{ type: 'text'; text: string }> }>
}

interface ModelContext {
  provideContext: (context: { tools: WebMcpTool[] }) => void
}

export function registerWebMcpTools(): void {
  const modelContext = (navigator as Navigator & { modelContext?: ModelContext }).modelContext
  if (!modelContext) return

  modelContext.provideContext({
    tools: [
      {
        name: 'get_download_links',
        description: 'Retorna os links de download do Zoji na App Store e na Google Play.',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => ({
          content: [{
            type: 'text',
            text: JSON.stringify({
              ios: 'https://apps.apple.com/br/app/zoji/id6762674303',
              android: 'https://play.google.com/store/apps/details?id=dev.de4araujo.zoji',
            }),
          }],
        }),
      },
      {
        name: 'get_ai_agent_connection_info',
        description: 'Retorna como um agente de IA pode se conectar à conta de um usuário do Zoji (OAuth + MCP) pra ler contatos, conversas e grupos, enviar mensagens (com confirmação humana) e definir o status.',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => ({
          content: [{
            type: 'text',
            text: JSON.stringify({
              auth_guide: 'https://zoji.app/auth.md',
              mcp_endpoint: 'https://mcp.zoji.app/mcp',
              scopes: ['contacts:read', 'messages:read', 'messages:send', 'groups:read', 'groups:send', 'status:write'],
            }),
          }],
        }),
      },
    ],
  })
}
