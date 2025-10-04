import { useState, useEffect } from 'react';
import { Cloud, Database, AlertCircle, CheckCircle } from 'lucide-react';
import { STORAGE_CONFIG } from '@/constants';

interface DataSyncStatusProps {
  className?: string;
}

export function DataSyncStatus({ className = '' }: DataSyncStatusProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<'checking' | 'synced' | 'error' | 'offline'>('checking');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Verificar status de sincronização
    checkSyncStatus();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkSyncStatus = async () => {
    if (!STORAGE_CONFIG.USE_SUPABASE) {
      setSyncStatus('offline');
      return;
    }

    if (!isOnline) {
      setSyncStatus('offline');
      return;
    }

    try {
      // Testar conexão com Supabase
      const response = await fetch(STORAGE_CONFIG.SUPABASE_URL + '/rest/v1/', {
        headers: {
          'apikey': STORAGE_CONFIG.SUPABASE_KEY,
          'Authorization': `Bearer ${STORAGE_CONFIG.SUPABASE_KEY}`
        }
      });

      if (response.ok) {
        setSyncStatus('synced');
      } else {
        setSyncStatus('error');
      }
    } catch (error) {
      console.error('Erro ao verificar sincronização:', error);
      setSyncStatus('error');
    }
  };

  const getStatusIcon = () => {
    if (!STORAGE_CONFIG.USE_SUPABASE) {
      return <Database className="w-4 h-4 text-gray-500" />;
    }

    switch (syncStatus) {
      case 'synced':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'offline':
        return <Database className="w-4 h-4 text-yellow-500" />;
      default:
        return <Cloud className="w-4 h-4 text-blue-500 animate-pulse" />;
    }
  };

  const getStatusText = () => {
    if (!STORAGE_CONFIG.USE_SUPABASE) {
      return 'Armazenamento Local';
    }

    switch (syncStatus) {
      case 'synced':
        return 'Dados Sincronizados';
      case 'error':
        return 'Erro de Sincronização';
      case 'offline':
        return 'Modo Offline';
      default:
        return 'Verificando...';
    }
  };

  const getStatusColor = () => {
    if (!STORAGE_CONFIG.USE_SUPABASE) {
      return 'text-gray-500';
    }

    switch (syncStatus) {
      case 'synced':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'offline':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {getStatusIcon()}
      <span className={`text-sm font-medium ${getStatusColor()}`}>
        {getStatusText()}
      </span>
    </div>
  );
}
