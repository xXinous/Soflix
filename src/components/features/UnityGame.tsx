import React, { useEffect, useRef } from 'react';

interface UnityGameProps {
  className?: string;
}

export const UnityGame: React.FC<UnityGameProps> = ({ className = '' }) => {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: Implementar carregamento do jogo Unity WebGL
    // Este é um placeholder para futura integração
    console.log('Unity Game component mounted');
    
    // Exemplo de como será implementado:
    // 1. Carregar o build do Unity WebGL
    // 2. Inicializar o jogo no container
    // 3. Configurar callbacks de comunicação
    
    return () => {
      // Cleanup quando o componente for desmontado
      console.log('Unity Game component unmounted');
    };
  }, []);

  return (
    <div 
      ref={gameContainerRef}
      className={`w-full h-full bg-gray-800 rounded-lg flex items-center justify-center ${className}`}
      id="unity-game-container"
    >
      <div className="text-center text-gray-400">
        <div className="text-4xl mb-4">🎮</div>
        <h3 className="text-lg font-semibold mb-2">Unity Game</h3>
        <p className="text-sm">
          O jogo será carregado aqui
        </p>
        <div className="mt-4 text-xs text-gray-500">
          Preparando para WebGL...
        </div>
      </div>
    </div>
  );
};
