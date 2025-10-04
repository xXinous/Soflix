/**
 * Utilitários de rede para tratamento de erros e conectividade
 */

/**
 * Verifica se o erro é relacionado a CORS ou rede
 */
export function isNetworkError(error: any): boolean {
  if (!error) return false;
  
  const message = error.message?.toLowerCase() || '';
  const errorType = error.type?.toLowerCase() || '';
  
  return (
    message.includes('cors') ||
    message.includes('networkerror') ||
    message.includes('fetch') ||
    message.includes('failed to fetch') ||
    message.includes('connection') ||
    message.includes('timeout') ||
    errorType === 'networkerror' ||
    error.name === 'NetworkError' ||
    error.name === 'TypeError'
  );
}

/**
 * Verifica se há conectividade com a internet
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Aguarda uma quantidade de tempo antes de tentar novamente
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Tenta uma operação com retry automático
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Só faz retry para erros de rede
      if (!isNetworkError(error)) {
        break;
      }
      
      console.warn(`Tentativa ${attempt} falhou, tentando novamente em ${delayMs}ms...`, error);
      await delay(delayMs);
      delayMs *= 2; // Backoff exponencial
    }
  }
  
  throw lastError;
}

/**
 * Verifica se o Supabase está acessível
 */
export async function checkSupabaseConnectivity(url: string): Promise<boolean> {
  try {
    const response = await fetch(`${url}/rest/v1/`, {
      method: 'HEAD',
      headers: {
        'apikey': 'dummy-key-for-connectivity-check',
      },
    });
    
    // Qualquer resposta (mesmo 401/403) indica que o servidor está acessível
    return true;
  } catch (error) {
    console.warn('Supabase não acessível:', error);
    return false;
  }
}

/**
 * Log estruturado de erros de rede
 */
export function logNetworkError(operation: string, error: any): void {
  const errorInfo = {
    operation,
    error: error?.message || error,
    type: error?.type || error?.name,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    online: navigator.onLine,
  };
  
  console.error(`❌ Erro de rede em ${operation}:`, errorInfo);
}
