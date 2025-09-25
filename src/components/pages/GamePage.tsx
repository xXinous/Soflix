import React from 'react';
import { PageProps } from '@/types';
import { UnityGame } from '@/components/features/UnityGame';

export const GamePage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header simples para voltar */}
      <div className="px-4 py-4 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Voltar</span>
        </button>
      </div>

      {/* Container principal do jogo */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-red-500">
            🎮 GAME!
          </h1>
          <p className="text-gray-300 text-lg">
            Nosso jogo especial está sendo preparado...
          </p>
        </div>

        {/* Container para o jogo Unity */}
        <div className="w-full max-w-4xl bg-gray-900 rounded-lg border border-gray-700 p-4">
          <div className="aspect-video">
            <UnityGame className="w-full h-full" />
          </div>
        </div>

        {/* Instruções */}
        <div className="mt-8 text-center max-w-2xl">
          <h3 className="text-lg font-semibold mb-3">Como jogar:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="font-semibold text-red-400 mb-2">🎯 Objetivo</div>
              <p>Divirta-se com nosso jogo especial!</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="font-semibold text-red-400 mb-2">📱 Mobile</div>
              <p>Otimizado para celular e desktop</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
