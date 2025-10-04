import { ArrowLeft, Heart, Play } from 'lucide-react';
import { useNavigation } from '@/hooks';

interface SeriesLetterProps {}

export function SeriesLetter({}: SeriesLetterProps) {
  const { goBack } = useNavigation();

  // Conteúdo da carta - facilmente editável
  const letterContent = `
Sofi, Sofi, Sofi...O cronômetro da nossa história marca 3 meses e 2 semanas, e eu me pego maratonando cada segundo que passamos juntos desde a nossa estreia.

Cada mês foi como uma temporada nova, cheia de reviravoltas emocionantes e momentos que mereciam um "replay".Nessas primeiras temporadas, fui descobrindo a protagonista incrível que você é: sua força, seu jeito único de amar e o roteiro perfeito do seu sorriso.

E estar no seu elenco me fez ver o meu próprio desenvolvimento de personagem. Ao seu lado, aprendo a ser alguém melhor, não só para você, mas para todos que fazem parte da minha trama.

Você me ensina que os melhores episódios são aqueles que não estavam no script, os espontâneos, onde a gente simplesmente aproveita o momento.Já se foram 3 temporadas inesquecíveis, e a minha única torcida é para que a nossa série seja renovada por tempo indeterminado, até que os diretores lá de cima decidam pelo nosso grand finale.
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
        <div className="h-64 bg-gradient-to-r from-red-600 to-pink-600 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="text-center z-10 px-4">
            <h2 className="text-4xl md:text-5xl mb-4">Novas temporadas:</h2>
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
        <div className="text-center mt-8 p-6 bg-gradient-to-r from-red-600/10 to-pink-600/10 rounded-lg border border-red-500/20">
          <p className="text-gray-300 italic">
            "Ainda estamos só no começo."
          </p>
        </div>
      </div>
    </div>
  );
}