import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Globe, TrendingUp, Clock, MapPin, Monitor, Smartphone, Tablet } from 'lucide-react';
import { getAnalyticsStats } from '@/utils/cloudflareAnalytics';

interface AnalyticsDashboardProps {
  onBack: () => void;
}

export function AnalyticsDashboard({ onBack }: AnalyticsDashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const analyticsStats = await getAnalyticsStats();
      
      if (analyticsStats) {
        setStats(analyticsStats);
      } else {
        setError('Nenhum dado de analytics encontrado');
      }
    } catch (err) {
      setError('Erro ao carregar dados de analytics');
      console.error('Error loading analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="w-6 h-6" />;
      case 'tablet':
        return <Tablet className="w-6 h-6" />;
      default:
        return <Monitor className="w-6 h-6" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando dados de analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Erro ao Carregar Analytics</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={loadStats}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors"
            >
              Tentar Novamente
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                  <span>SoFlix Analytics</span>
                </h1>
                <p className="text-sm text-gray-400">Dados de usuários via Cloudflare + Supabase</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Última atualização</p>
              <p className="text-sm font-medium">{stats ? formatDate(stats.lastUpdated) : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total de Visitas</p>
                <p className="text-3xl font-bold text-blue-400">{stats?.totalVisits || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Usuários Únicos</p>
                <p className="text-3xl font-bold text-green-400">{stats?.uniqueIPs || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Dispositivos Únicos</p>
                <p className="text-3xl font-bold text-purple-400">{stats?.uniqueDevices || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Monitor className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Países</p>
                <p className="text-3xl font-bold text-orange-400">{stats?.countries?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* User Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>Tipos de Usuário</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Visitantes</span>
                </div>
                <span className="font-bold text-cyan-400">{stats?.userTypes?.visitor || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                  <span className="text-gray-300">Sofia</span>
                </div>
                <span className="font-bold text-pink-400">{stats?.userTypes?.sofia || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Marcelo</span>
                </div>
                <span className="font-bold text-blue-400">{stats?.userTypes?.marcelo || 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <Globe className="w-5 h-5 text-green-400" />
              <span>Países</span>
            </h3>
            <div className="space-y-2">
              {stats?.countries?.slice(0, 5).map((country: string, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300">{country}</span>
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
              ))}
              {(!stats?.countries || stats.countries.length === 0) && (
                <p className="text-gray-400 text-sm">Nenhum país registrado</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Visits */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span>Acessos Recentes</span>
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {stats?.recentVisits?.slice(0, 20).map((visit: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    visit.user_type === 'visitor' ? 'bg-cyan-400' :
                    visit.user_type === 'sofia' ? 'bg-pink-400' : 'bg-blue-400'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium">
                      {visit.device_type || 'Unknown'} • {visit.browser_name || 'Unknown'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {visit.country || 'Unknown'} • {visit.user_type}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    {formatDate(visit.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {(!stats?.recentVisits || stats.recentVisits.length === 0) && (
              <div className="text-center py-8 text-gray-400">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Nenhum acesso recente registrado</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Dados coletados via Cloudflare Workers e armazenados no Supabase
          </p>
        </div>
      </div>
    </div>
  );
}
