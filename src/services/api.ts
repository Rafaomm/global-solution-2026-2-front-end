const BASE_URL = ((import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8080').replace(/\/$/, '')

type Metodo = 'GET' | 'POST' | 'PUT' | 'DELETE'

export class ApiError extends Error {
  status: number

  constructor(mensagem: string, status: number) {
    super(mensagem)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function request<T>(caminho: string, metodo: Metodo = 'GET', corpo?: unknown): Promise<T> {
  let resposta: Response
  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, {
      method: metodo,
      headers: corpo !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
    })
  } catch {
    throw new ApiError('Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.', 0)
  }

  if (resposta.status === 204) return undefined as T

  const texto = await resposta.text()
  let dados: unknown = null
  try {
    dados = texto ? JSON.parse(texto) : null
  } catch {
    dados = null
  }

  if (!resposta.ok) {
  console.error('Erro na API:', {
    status: resposta.status,
    statusText: resposta.statusText,
    url: resposta.url,
    resposta: texto,
    corpoEnviado: corpo,
  })

  const erro = (dados as { erro?: string } | null)?.erro
  throw new ApiError(
    erro ?? `Erro ${resposta.status} ao falar com o servidor.`,
    resposta.status
  )
}
  return dados as T
}

export function mensagemErro(e: unknown): string {
  return e instanceof Error ? e.message : 'Algo deu errado. Tente novamente.'
}
