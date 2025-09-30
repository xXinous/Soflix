import React, { useState } from 'react';
import { Bell, X, Play, Plus, Heart, Star } from 'lucide-react';

interface Notification {
  id: string;
  type: 'new_content' | 'recommendation' | 'reminder' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Notificações mockadas para demonstração
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'new_content',
    title: 'Novo conteúdo adicionado!',
    message: 'Amor em Cascata foi adicionado à sua lista de favoritos.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    isRead: false,
  },
  {
    id: '2',
    type: 'recommendation',
    title: 'Recomendação para você',
    message: 'Baseado no que você assistiu, talvez goste de "The Pijama Dreamer".',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    isRead: false,
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Conquista desbloqueada!',
    message: 'Você assistiu 10 filmes da nossa coleção especial.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
    isRead: true,
  },
  {
    id: '4',
    type: 'reminder',
    title: 'Continue assistindo',
    message: 'Você parou de assistir "Flip Fever" há 2 dias.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 dias atrás
    isRead: true,
  },
];

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  isOpen,
  onClose
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'new_content':
        return <Plus className="w-4 h-4 text-green-500" />;
      case 'recommendation':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'reminder':
        return <Play className="w-4 h-4 text-blue-500" />;
      case 'achievement':
        return <Heart className="w-4 h-4 text-red-500" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'new_content':
        return 'border-l-green-500';
      case 'recommendation':
        return 'border-l-yellow-500';
      case 'reminder':
        return 'border-l-blue-500';
      case 'achievement':
        return 'border-l-red-500';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}min atrás`;
    } else if (hours < 24) {
      return `${hours}h atrás`;
    } else {
      return `${days}d atrás`;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex items-start justify-end min-h-screen pt-16 pr-4">
        <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-white" />
              <h2 className="text-lg font-semibold text-white">Notificações</h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                  type="button"
                >
                  Marcar todas como lidas
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-800 rounded transition-colors"
                type="button"
                aria-label="Fechar notificações"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Lista de notificações */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-700">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`
                      p-4 border-l-4 transition-colors cursor-pointer
                      ${getNotificationColor(notification.type)}
                      ${notification.isRead 
                        ? 'bg-gray-900/50 hover:bg-gray-800/50' 
                        : 'bg-gray-800/50 hover:bg-gray-700/50'
                      }
                    `}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`
                            text-sm font-medium truncate
                            ${notification.isRead ? 'text-gray-300' : 'text-white'}
                          `}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500 ml-2">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        <p className={`
                          text-sm mt-1
                          ${notification.isRead ? 'text-gray-400' : 'text-gray-300'}
                        `}>
                          {notification.message}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  Nenhuma notificação
                </h3>
                <p className="text-gray-500">
                  Você está em dia! Novas notificações aparecerão aqui.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-700 bg-gray-800/50">
              <p className="text-xs text-gray-400 text-center">
                {unreadCount} notificação{unreadCount !== 1 ? 'ões' : ''} não lida{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

