import { ArrowLeft, Heart, Play } from 'lucide-react';
import { useNavigation } from '@/hooks';

interface MoviesLetterProps {
  onBack: () => void;
}

export function MoviesLetter({ onBack }: MoviesLetterProps) {
  const { goBack } = useNavigation();

  // Conteúdo da carta - facilmente editável
  const letterContent = `
    [CARTA PARA FILMES - ESCREVER NO GOOGLE DOCS E COLAR AQUI]
    
    Aqui você pode escrever sua carta romântica sobre filmes...
    Este texto será substituído pelo conteúdo que você escrever no Google Docs.
    
    Mantenha a formatação do Google Docs aqui para facilitar a edição.
  `;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header estilo Netflix */}
      <header className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent relative z-10">
        <div className="flex items-center space-x-6">
          <button
            onClick={goBack}
            className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para SOFLIX</span>
          </button>
        </div>
        <h1 className="text-2xl font-bold text-red-500">SOFLIX</h1>
      </header>

      {/* Hero Section estilo Netflix */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="text-center z-10 px-4">
            <h2 className="text-4xl md:text-5xl mb-4">Carta sobre Filmes</h2>
            <p className="text-lg md:text-xl">Uma carta especial para minha amada Sofia</p>
          </div>
        </div>
      </div>

      {/* Conteúdo da carta estilo Netflix */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-lg p-8 md:p-12">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Para Sofia</h3>
                <p className="text-gray-400">Com amor, Marcelo</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Play className="w-4 h-4" />
              <span className="text-sm">Uma história de amor</span>
            </div>
          </div>

          {/* Separador */}
          <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mb-8"></div>

          {/* Conteúdo da carta */}
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line leading-relaxed text-gray-200 text-lg">
              {letterContent}
            </div>
          </div>

          {/* Assinatura estilo Netflix */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-gray-300">Escrito com amor por</span>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-red-400">Marcelo</p>
                <p className="text-sm text-gray-400">Para sempre seu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer romântico */}
        <div className="text-center mt-8 p-6 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg border border-pink-500/20">
          <p className="text-gray-300 italic">
            "Te ter do meu lado é como viver em um filme perfeito."
          </p>
        </div>
      </div>
    </div>
  );
}