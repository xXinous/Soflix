import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Logo e descrição */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Heart className="h-6 w-6 text-red-500 fill-current" />
            <span className="text-2xl font-bold text-white">SOFLIX</span>
          </div>
          <p className="text-gray-400 text-sm text-center md:text-right max-w-md">
            Uma plataforma de streaming dedicada às histórias de amor mais especiais. 
            Cada filme conta uma parte da nossa jornada juntos.
          </p>
        </div>

        {/* Links e informações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Sobre */}
          <div>
            <h3 className="text-white font-semibold mb-3">Sobre o SOFLIX</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Nossa História
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Carreiras
                </a>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-white font-semibold mb-3">Suporte</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="mailto:contato@soflix.com" className="hover:text-white transition-colors">
                  contato@soflix.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Redes Sociais
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Direitos autorais */}
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>
                © {currentYear} SOFLIX. Todos os direitos reservados.
              </p>
              <p className="mt-1">
                Feito com <Heart className="inline h-4 w-4 text-red-500 fill-current" /> para celebrar o amor.
              </p>
            </div>

            {/* Informações técnicas */}
            <div className="text-xs text-gray-500 text-center md:text-right">
              <p>Desenvolvido com React, TypeScript e Tailwind CSS</p>
              <p className="mt-1">Inspirado no design da Netflix</p>
            </div>
          </div>
        </div>

        {/* Mensagem especial */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 italic">
            "Cada momento ao seu lado é como viver num filme romântico perfeito." 
            <span className="block mt-1 text-xs">
              - Nossa história de amor continua sendo escrita a cada dia
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
