// Utilitário para detectar informações do dispositivo e navegador com validação de segurança

import { sanitizeInput, validateDeviceInfo } from './encryption';

export interface DeviceInfo {
  deviceType: 'mobile' | 'tablet' | 'desktop';
  deviceName: string;
  browserName: string;
  browserVersion: string;
  os: string;
  screenResolution: string;
  language: string;
  timezone: string;
}

export function getDeviceInfo(): DeviceInfo {
  const userAgent = navigator.userAgent;
  
  // Detectar tipo de dispositivo
  const deviceType = (() => {
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile';
    return 'desktop';
  })();

  // Detectar nome do dispositivo
  const deviceName = (() => {
    if (/iPhone/i.test(userAgent)) {
      const match = userAgent.match(/iPhone OS (\d+_\d+)/);
      return `iPhone (iOS ${match ? match[1].replace('_', '.') : 'Unknown'})`;
    }
    if (/iPad/i.test(userAgent)) {
      const match = userAgent.match(/OS (\d+_\d+)/);
      return `iPad (iOS ${match ? match[1].replace('_', '.') : 'Unknown'})`;
    }
    if (/Android/i.test(userAgent)) {
      const match = userAgent.match(/Android (\d+\.?\d*)/);
      const deviceMatch = userAgent.match(/;\s*([^)]+)\s*\)/);
      const deviceModel = deviceMatch ? deviceMatch[1].split(';')[0].trim() : 'Android Device';
      return `${deviceModel} (Android ${match ? match[1] : 'Unknown'})`;
    }
    if (/Windows NT/i.test(userAgent)) {
      const match = userAgent.match(/Windows NT (\d+\.\d+)/);
      const versions: {[key: string]: string} = {
        '10.0': '10/11',
        '6.3': '8.1',
        '6.2': '8',
        '6.1': '7',
        '6.0': 'Vista'
      };
      const version = match ? versions[match[1]] || match[1] : 'Unknown';
      return `Windows ${version}`;
    }
    if (/Mac OS X/i.test(userAgent)) {
      const match = userAgent.match(/Mac OS X (\d+[._]\d+[._]?\d*)/);
      const version = match ? match[1].replace(/_/g, '.') : 'Unknown';
      return `Mac OS ${version}`;
    }
    if (/Linux/i.test(userAgent)) {
      return 'Linux Desktop';
    }
    return 'Dispositivo Desconhecido';
  })();

  // Detectar navegador
  const browserInfo = (() => {
    if (/Chrome/i.test(userAgent) && !/Edge|Edg/i.test(userAgent)) {
      const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
      return { name: 'Chrome', version: match ? match[1] : 'Unknown' };
    }
    if (/Firefox/i.test(userAgent)) {
      const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
      return { name: 'Firefox', version: match ? match[1] : 'Unknown' };
    }
    if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
      const match = userAgent.match(/Version\/(\d+\.\d+)/);
      return { name: 'Safari', version: match ? match[1] : 'Unknown' };
    }
    if (/Edge|Edg/i.test(userAgent)) {
      const match = userAgent.match(/(?:Edge|Edg)\/(\d+\.\d+)/);
      return { name: 'Edge', version: match ? match[1] : 'Unknown' };
    }
    return { name: 'Navegador Desconhecido', version: 'Unknown' };
  })();

  // Detectar sistema operacional
  const os = (() => {
    if (/Windows/i.test(userAgent)) return 'Windows';
    if (/Mac OS/i.test(userAgent)) return 'macOS';
    if (/iPhone|iPad/i.test(userAgent)) return 'iOS';
    if (/Android/i.test(userAgent)) return 'Android';
    if (/Linux/i.test(userAgent)) return 'Linux';
    return 'Sistema Desconhecido';
  })();

  const deviceInfo: DeviceInfo = {
    deviceType,
    deviceName: sanitizeInput(deviceName),
    browserName: sanitizeInput(browserInfo.name),
    browserVersion: sanitizeInput(browserInfo.version),
    os: sanitizeInput(os),
    screenResolution: sanitizeInput(`${screen.width}x${screen.height}`),
    language: sanitizeInput(navigator.language || 'pt-BR'),
    timezone: sanitizeInput(Intl.DateTimeFormat().resolvedOptions().timeZone)
  };

  // Validar dados antes de retornar
  if (!validateDeviceInfo(deviceInfo)) {
    console.warn('Dados de dispositivo inválidos detectados');
    // Retornar dados seguros padrão
    return {
      deviceType: 'desktop',
      deviceName: 'Dispositivo Desconhecido',
      browserName: 'Navegador Desconhecido',
      browserVersion: 'Unknown',
      os: 'Sistema Desconhecido',
      screenResolution: 'Unknown',
      language: 'pt-BR',
      timezone: 'UTC'
    };
  }

  return deviceInfo;
}

// Função para obter IP com validação de segurança
export async function getUserIP(): Promise<string> {
  try {
    // Usando um serviço gratuito para obter IP
    const response = await fetch('https://api.ipify.org?format=json', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Timeout de 5 segundos
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    const ip = data.ip || 'IP não detectado';
    
    // Sanitizar e validar IP
    const sanitizedIP = sanitizeInput(ip);
    
    // Verificar se é um IP válido
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    
    if (ipv4Regex.test(sanitizedIP) || ipv6Regex.test(sanitizedIP)) {
      return sanitizedIP;
    }
    
    return 'IP inválido';
  } catch (error) {
    console.warn('Erro ao obter IP:', error);
    // Fallback para quando não conseguir obter o IP
    return 'IP não detectado';
  }
}

// Função para gerar um ID único para sessão
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}