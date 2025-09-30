import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Eye, Calendar, Heart, TrendingUp, Clock, Globe, Smartphone, Monitor, Tablet, MapPin, Info, X } from 'lucide-react';
import { DeviceInfo } from '../utils/deviceInfo';

interface AdminDashboardProps {
  onBack: () => void;
}

interface Visit {
  sessionId: string;
  timestamp: string;
  type: 'sofia_access' | 'admin_access';
  userIP: string;
  deviceInfo: DeviceInfo;
  userAgent?: string;
  location?: string;
}

interface UserStats {
  ip: string;
  deviceName: string;
  realDeviceName?: string;
  totalAccesses: number;
  firstAccess: string;
  lastAccess: string;
  visits: Visit[];
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [sofiaVisits, setSofiaVisits] = useState<Visit[]>([]);
  const [adminVisits, setAdminVisits] = useState<Visit[]>([]);
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserStats | null>(null);
  const [stats, setStats] = useState({
    totalVisits: 0,
    sofiaVisits: 0,
    adminVisits: 0,
    todayVisits: 0,
    thisWeekVisits: 0,
    averagePerDay: 0,
    uniqueDevices: 0,
    uniqueIPs: 0
  });

  useEffect(() => {
    // Carregar dados do localStorage
    const sofia = JSON.parse(localStorage.getItem('soflix_sofia_visits') || '[]');
    const admin = JSON.parse(localStorage.getItem('soflix_admin_visits') || '[]');
    
    setSofiaVisits(sofia);
    setAdminVisits(admin);

    // Processar estatísticas de usuários únicos
    const allVisits = [...sofia, ...admin];
    const userMap = new Map<string, UserStats>();

    allVisits.forEach(visit => {
      const key = `${visit.userIP}-${visit.deviceInfo?.deviceName || 'Unknown'}`;
      
      if (!userMap.has(key)) {
        userMap.set(key, {
          ip: visit.userIP,
          deviceName: visit.deviceInfo?.deviceName || 'Dispositivo Desconhecido',
          realDeviceName: visit.deviceInfo?.realDeviceName,
          totalAccesses: 0,
          firstAccess: visit.timestamp,
          lastAccess: visit.timestamp,
          visits: []
        });
      }

      const user = userMap.get(key)!;
      user.totalAccesses++;
      user.visits.push(visit);
      
      if (new Date(visit.timestamp) < new Date(user.firstAccess)) {
        user.firstAccess = visit.timestamp;
      }
      if (new Date(visit.timestamp) > new Date(user.lastAccess)) {
        user.lastAccess = visit.timestamp;
      }
    });

    const userStatsArray = Array.from(userMap.values()).sort((a, b) => b.totalAccesses - a.totalAccesses);
    setUserStats(userStatsArray);

    // Calcular estatísticas
    const today = new Date().toDateString();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const todayCount = allVisits.filter(visit => 
      new Date(visit.timestamp).toDateString() === today
    ).length;

    const weekCount = allVisits.filter(visit => 
      new Date(visit.timestamp) >= weekAgo
    ).length;

    const totalDays = allVisits.length > 0 ? 
      Math.max(1, Math.ceil((Date.now() - new Date(allVisits[0]?.timestamp || Date.now()).getTime()) / (1000 * 60 * 60 * 24))) : 1;

    const uniqueIPs = new Set(allVisits.map(v => v.userIP)).size;
    const uniqueDevices = new Set(allVisits.map(v => v.deviceInfo?.deviceName)).size;

    setStats({
      totalVisits: allVisits.length,
      sofiaVisits: sofia.length,
      adminVisits: admin.length,
      todayVisits: todayCount,
      thisWeekVisits: weekCount,
      averagePerDay: Math.round(allVisits.length / totalDays * 10) / 10,
      uniqueDevices,
      uniqueIPs
    });
  }, []);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const visit = new Date(timestamp);
    const diff = now.getTime() - visit.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days} dia${days > 1 ? 's' : ''} atrás`;
    if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
    if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
    return 'Agora mesmo';
  };

  const clearData = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados de acesso?')) {
      localStorage.removeItem('soflix_sofia_visits');
      localStorage.removeItem('soflix_admin_visits');
      setSofiaVisits([]);
      setAdminVisits([]);
      setStats({
        totalVisits: 0,
        sofiaVisits: 0,
        adminVisits: 0,
        todayVisits: 0,
        thisWeekVisits: 0,
        averagePerDay: 0
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent relative z-10 border-b border-gray-800">
        <div className="flex items-center space-x-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
        </div>
        <h1 className="text-2xl font-bold text-red-500">SOFLIX ADMIN</h1>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h2 className="text-4xl mb-4">Painel de Controle</h2>
          <p className="text-gray-300 text-lg">Dashboard de acessos ao SoFlix</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Total de Acessos</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalVisits}</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="w-5 h-5 text-pink-400" />
              <span className="text-sm text-gray-400">Sofia</span>
            </div>
            <p className="text-2xl font-bold text-pink-400">{stats.sofiaVisits}</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-400">Admin</span>
            </div>
            <p className="text-2xl font-bold text-gray-400">{stats.adminVisits}</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Hoje</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{stats.todayVisits}</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-400">Esta Semana</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">{stats.thisWeekVisits}</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">Média/Dia</span>
            </div>
            <p className="text-2xl font-bold text-purple-400">{stats.averagePerDay}</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-gray-400">IPs Únicos</span>
            </div>
            <p className="text-2xl font-bold text-cyan-400">{stats.uniqueIPs}</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Monitor className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-gray-400">Dispositivos</span>
            </div>
            <p className="text-2xl font-bold text-orange-400">{stats.uniqueDevices}</p>
          </div>
        </div>

        {/* User Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Users Overview */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span>Usuários por Dispositivo</span>
              </h3>
              <span className="text-sm text-gray-400">{userStats.length} usuários únicos</span>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {userStats.map((user, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg cursor-pointer hover:bg-blue-900/30 transition-colors"
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {getDeviceIcon(user.visits[0]?.deviceInfo?.deviceType || 'desktop')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {user.realDeviceName || user.deviceName}
                      </p>
                      {user.realDeviceName && user.realDeviceName !== user.deviceName && (
                        <p className="text-xs text-gray-500 truncate">{user.deviceName}</p>
                      )}
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{user.ip}</span>
                        <span>•</span>
                        <span>{user.totalAccesses} acessos</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Último acesso</p>
                      <p className="text-xs font-medium">{getTimeAgo(user.lastAccess)}</p>
                    </div>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
              
              {userStats.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Ainda não há usuários registrados</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span>Atividade Recente</span>
              </h3>
              <span className="text-sm text-gray-400">Últimos 20 acessos</span>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {[...sofiaVisits, ...adminVisits]
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, 20)
                .map((visit, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                  visit.type === 'sofia_access' 
                    ? 'bg-pink-900/20 border-pink-500/30' 
                    : 'bg-gray-800/50 border-gray-700'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      visit.type === 'sofia_access' ? 'bg-pink-400 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        {getDeviceIcon(visit.deviceInfo?.deviceType || 'desktop')}
                        <div className="min-w-0 flex-1">
                          <span className="text-sm font-medium truncate block">
                            {visit.deviceInfo?.realDeviceName || visit.deviceInfo?.deviceName || 'Dispositivo Desconhecido'}
                          </span>
                          {visit.deviceInfo?.realDeviceName && visit.deviceInfo?.realDeviceName !== visit.deviceInfo?.deviceName && (
                            <span className="text-xs text-gray-500 truncate block">
                              {visit.deviceInfo?.deviceName}
                            </span>
                          )}
                        </div>
                        {visit.type === 'sofia_access' && <Heart className="w-3 h-3 text-pink-400" />}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span>{formatDate(visit.timestamp)}</span>
                        <span>•</span>
                        <span>{visit.userIP}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {getTimeAgo(visit.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={clearData}
            className="px-6 py-3 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
          >
            Limpar Dados de Acesso
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center p-6 bg-gradient-to-r from-red-600/10 to-pink-600/10 rounded-lg border border-red-500/20">
          <h3 className="text-lg font-bold mb-2">SoFlix Analytics</h3>
          <p className="text-gray-300 text-sm">
            Sistema de monitoramento criado com amor para acompanhar os acessos ao nosso site especial
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Dados armazenados localmente no navegador
          </p>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {getDeviceIcon(selectedUser.visits[0]?.deviceInfo?.deviceType || 'desktop')}
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {selectedUser.realDeviceName || selectedUser.deviceName}
                  </h2>
                  {selectedUser.realDeviceName && selectedUser.realDeviceName !== selectedUser.deviceName && (
                    <p className="text-sm text-gray-500">{selectedUser.deviceName}</p>
                  )}
                  <p className="text-gray-400 flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedUser.ip}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Stats */}
            <div className="p-6 border-b border-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">{selectedUser.totalAccesses}</p>
                  <p className="text-sm text-gray-400">Total de Acessos</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-400">{formatDate(selectedUser.firstAccess).split(' ')[0]}</p>
                  <p className="text-sm text-gray-400">Primeiro Acesso</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-yellow-400">{formatDate(selectedUser.lastAccess).split(' ')[0]}</p>
                  <p className="text-sm text-gray-400">Último Acesso</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-purple-400">
                    {selectedUser.visits.filter(v => v.type === 'sofia_access').length}
                  </p>
                  <p className="text-sm text-gray-400">Acessos Sofia</p>
                </div>
              </div>
            </div>

            {/* Device Details */}
            {selectedUser.visits[0]?.deviceInfo && (
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-bold mb-4">Informações do Dispositivo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Nome do Dispositivo:</span>
                      <span className="font-medium">
                        {selectedUser.visits[0].deviceInfo.realDeviceName || 'Não detectado'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sistema Operacional:</span>
                      <span className="font-medium">{selectedUser.visits[0].deviceInfo.os}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Navegador:</span>
                      <span className="font-medium">
                        {selectedUser.visits[0].deviceInfo.browserName} {selectedUser.visits[0].deviceInfo.browserVersion}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tipo:</span>
                      <span className="font-medium capitalize">{selectedUser.visits[0].deviceInfo.deviceType}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Resolução:</span>
                      <span className="font-medium">{selectedUser.visits[0].deviceInfo.screenResolution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Idioma:</span>
                      <span className="font-medium">{selectedUser.visits[0].deviceInfo.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fuso Horário:</span>
                      <span className="font-medium">{selectedUser.visits[0].deviceInfo.timezone}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Visit History */}
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">Histórico de Acessos</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {selectedUser.visits
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((visit, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    visit.type === 'sofia_access' 
                      ? 'bg-pink-900/20 border-pink-500/30' 
                      : 'bg-gray-800/50 border-gray-700'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          visit.type === 'sofia_access' ? 'bg-pink-400' : 'bg-gray-400'
                        }`}></div>
                        <div>
                          <p className="text-sm font-medium">{formatDate(visit.timestamp)}</p>
                          <p className="text-xs text-gray-400">{getTimeAgo(visit.timestamp)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {visit.type === 'sofia_access' && <Heart className="w-4 h-4 text-pink-400" />}
                        <span className={`text-xs px-2 py-1 rounded ${
                          visit.type === 'sofia_access' 
                            ? 'bg-pink-500/20 text-pink-300' 
                            : 'bg-gray-600/20 text-gray-300'
                        }`}>
                          {visit.type === 'sofia_access' ? 'Sofia' : 'Admin'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}