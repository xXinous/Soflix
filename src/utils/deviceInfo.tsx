// Utilitário para detectar informações do dispositivo e navegador

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

  return {
    deviceType,
    deviceName,
    browserName: browserInfo.name,
    browserVersion: browserInfo.version,
    os,
    screenResolution: `${screen.width}x${screen.height}`,
    language: navigator.language || 'pt-BR',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
}

// Função para obter IP (limitada no frontend, mas vamos tentar)
export async function getUserIP(): Promise<string> {
  try {
    // Usando um serviço gratuito para obter IP
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'IP não detectado';
  } catch (error) {
    // Fallback para quando não conseguir obter o IP
    return 'IP não detectado';
  }
}

// Função para gerar um ID único para sessão
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}