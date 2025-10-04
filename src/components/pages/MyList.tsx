import React from 'react';
import { ArrowLeft, Heart, Plus, Check } from 'lucide-react';
import { useNavigation } from '@/hooks';

interface MyListProps {
  onBack: () => void;
}

export function MyList({ onBack }: MyListProps) {
  const { goBack } = useNavigation();

  // Lista dos detalhes que você adora na Sofia - facilmente editável
  const thingsILoveAboutSofia = [
    "Esforço",
    "Carinho", 
    "Dedicação",
    "Empenho",
    "Beijo",
    "Olhar",
    "Sorriso",
    "Abraço", 
    "Cheiro",
    "Toque",
    "Pele",
    "Beijo", // denovo
    "Bunda",
    "Gosto para comida",
    "Gosto musical",
    "Gosto para filmes",
    "A facilidade de puxar assunto",
    "Sorriso", // denovo
    "Bunda", // denovo
    "Olhar", // denovo
    "Presentes"
  ];

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
        <div className="h-48 bg-gradient-to-r from-red-600 to-pink-600 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="text-center z-10 px-4">
            <h2 className="text-4xl md:text-5xl mb-4">Minha Lista</h2>
            <p className="text-lg md:text-xl">Detalhes que adoro na Sofia</p>
          </div>
        </div>
      </div>

      {/* Conteúdo da lista estilo Netflix */}
      <div className="max-w-6xl mx-auto p-8">
        {/* Stats da lista */}
        <div className="flex items-center justify-between mb-8 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Lista Completa</h3>
              <p className="text-gray-400">{thingsILoveAboutSofia.length} razões para te amar</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Criado por</p>
            <p className="text-red-400 font-semibold">Marcelo</p>
          </div>
        </div>

        {/* Grid de itens estilo Netflix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {thingsILoveAboutSofia.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="group relative bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              <div className="aspect-video bg-gradient-to-br from-red-600/20 to-pink-600/20 flex items-center justify-center relative">
                <Heart className="w-12 h-12 text-red-500/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white group-hover:text-red-400 transition-colors">{item}</h4>
                  <div className="flex items-center space-x-1">
                    <button className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                    <button className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                      <Check className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  <span>❤️ Favorito</span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  <span>Sempre</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer romântico estilo Netflix */}
        <div className="mt-12 p-8 bg-gradient-to-r from-red-600/10 to-pink-600/10 rounded-lg border border-red-500/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Para Sofia, com todo meu amor</h3>
            <p className="text-lg text-gray-300 italic mb-4">
              "Cada detalhe de você é perfeito e faz meu coração acelerar. Te amo infinitamente!"
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-red-400 font-semibold">Marcelo</p>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Desde 14/06/2025 - Para sempre</p>
          </div>
        </div>
      </div>
    </div>
  );
}