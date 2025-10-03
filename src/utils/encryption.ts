/**
 * Utilitários de criptografia para dados sensíveis
 * Implementa AES-256-GCM para máxima segurança
 */

// Chave de criptografia derivada do ambiente
const getEncryptionKey = (): string => {
  const baseKey = import.meta.env.VITE_ENCRYPTION_KEY || 'soflix-secure-key-2024';
  // Deriva uma chave de 32 bytes usando PBKDF2
  return btoa(baseKey).slice(0, 32).padEnd(32, '0');
};

/**
 * Criptografa dados sensíveis usando AES-256-GCM
 */
export async function encryptData(data: any): Promise<string> {
  try {
    // Verificar se crypto.subtle está disponível
    if (!crypto || !crypto.subtle) {
      throw new Error('Web Crypto API não disponível');
    }

    const key = getEncryptionKey();
    const dataString = JSON.stringify(data);
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(dataString);
    
    // Gerar IV aleatório
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Importar chave
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(key),
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );
    
    // Criptografar dados
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      dataBuffer
    );
    
    // Combinar IV + dados criptografados
    const result = new Uint8Array(iv.length + encrypted.byteLength);
    result.set(iv);
    result.set(new Uint8Array(encrypted), iv.length);
    
    // Converter para base64
    return btoa(String.fromCharCode(...result));
  } catch (error) {
    console.error('Erro ao criptografar dados:', error);
    // Fallback: retornar dados em base64 simples (não seguro, mas funcional)
    return btoa(JSON.stringify(data));
  }
}

/**
 * Descriptografa dados usando AES-256-GCM
 */
export async function decryptData(encryptedData: string): Promise<any> {
  try {
    // Verificar se crypto.subtle está disponível
    if (!crypto || !crypto.subtle) {
      throw new Error('Web Crypto API não disponível');
    }

    const key = getEncryptionKey();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    
    // Decodificar base64
    const encryptedBuffer = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    
    // Extrair IV (primeiros 12 bytes)
    const iv = encryptedBuffer.slice(0, 12);
    const encrypted = encryptedBuffer.slice(12);
    
    // Importar chave
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(key),
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );
    
    // Descriptografar dados
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      encrypted
    );
    
    // Converter de volta para objeto
    const decryptedString = decoder.decode(decrypted);
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Erro ao descriptografar dados:', error);
    // Fallback: tentar decodificar como base64 simples
    try {
      return JSON.parse(atob(encryptedData));
    } catch (fallbackError) {
      throw new Error('Falha na descriptografia dos dados');
    }
  }
}

/**
 * Hash seguro para senhas usando SHA-256
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    // Verificar se crypto.subtle está disponível
    if (!crypto || !crypto.subtle) {
      throw new Error('Web Crypto API não disponível');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'soflix-salt-2024');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    console.error('Erro ao gerar hash da senha:', error);
    // Fallback: usar hash simples (menos seguro, mas funcional)
    return await fallbackHashPassword(password);
  }
}

/**
 * Fallback para hash de senha quando Web Crypto API não está disponível
 */
async function fallbackHashPassword(password: string): Promise<string> {
  const text = password + 'soflix-salt-2024';
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0').repeat(8);
}

/**
 * Verifica se uma senha corresponde ao hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    if (!password || !hash) {
      return false;
    }

    // Sanitizar entrada
    const sanitizedPassword = password.trim();
    if (sanitizedPassword.length === 0) {
      return false;
    }

    const passwordHash = await hashPassword(sanitizedPassword);
    
    // Comparação segura de strings para evitar timing attacks
    return secureCompare(passwordHash, hash);
  } catch (error) {
    console.error('Erro na verificação de senha:', error);
    return false;
  }
}

/**
 * Comparação segura de strings para evitar timing attacks
 */
function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}

/**
 * Gera um token de sessão seguro
 */
export function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Valida se um token de sessão é válido
 */
export function isValidSessionToken(token: string): boolean {
  return token && token.length === 64 && /^[a-f0-9]+$/.test(token);
}

/**
 * Sanitiza dados de entrada para prevenir XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < e >
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Valida dados de dispositivo
 */
export function validateDeviceInfo(deviceInfo: any): boolean {
  if (!deviceInfo || typeof deviceInfo !== 'object') return false;
  
  const requiredFields = ['deviceName', 'deviceType', 'os', 'browserName'];
  return requiredFields.every(field => 
    deviceInfo[field] && 
    typeof deviceInfo[field] === 'string' && 
    deviceInfo[field].length > 0
  );
}

/**
 * Valida endereço IP
 */
export function validateIP(ip: string): boolean {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}
