#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB limit

async function optimizeImages() {
  console.log('🔧 Otimizando imagens para deploy...');
  
  const distAssetsPath = path.join(__dirname, '../dist/assets');
  
  if (!fs.existsSync(distAssetsPath)) {
    console.log('❌ Diretório dist/assets não encontrado. Execute npm run build primeiro.');
    process.exit(1);
  }

  // Encontrar arquivos de imagem grandes
  const files = fs.readdirSync(distAssetsPath);
  const imageFiles = files.filter(file => 
    /\.(png|jpg|jpeg)$/i.test(file)
  );

  const largeFiles = [];
  
  for (const file of imageFiles) {
    const filePath = path.join(distAssetsPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.size > MAX_FILE_SIZE) {
      largeFiles.push({
        name: file,
        path: filePath,
        size: stats.size,
        sizeMB: (stats.size / (1024 * 1024)).toFixed(1)
      });
    }
  }

  if (largeFiles.length === 0) {
    console.log('✅ Todas as imagens estão dentro do limite de tamanho.');
    return;
  }

  console.log(`⚠️  Encontradas ${largeFiles.length} imagens grandes:`);
  largeFiles.forEach(file => {
    console.log(`   - ${file.name}: ${file.sizeMB}MB`);
  });

  // Otimizar imagens grandes
  for (const file of largeFiles) {
    try {
      console.log(`🔧 Otimizando ${file.name}...`);
      
      const originalSize = file.size;
      
      // Otimizar PNGs
      if (file.name.toLowerCase().endsWith('.png')) {
        await imagemin([file.path], {
          destination: path.dirname(file.path),
          plugins: [
            imageminPngquant({
              quality: [0.6, 0.8],
              speed: 1
            })
          ]
        });
      }
      
      // Otimizar JPGs
      if (file.name.toLowerCase().match(/\.(jpg|jpeg)$/)) {
        await imagemin([file.path], {
          destination: path.dirname(file.path),
          plugins: [
            imageminMozjpeg({
              quality: 70,
              progressive: true
            })
          ]
        });
      }
      
      // Verificar novo tamanho
      const newStats = fs.statSync(file.path);
      const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(1);
      const savings = ((originalSize - newStats.size) / originalSize * 100).toFixed(1);
      
      console.log(`   ✅ ${file.name}: ${file.sizeMB}MB → ${newSizeMB}MB (${savings}% menor)`);
      
      // Se ainda estiver muito grande, substituir por placeholder
      if (newStats.size > MAX_FILE_SIZE) {
        console.log(`   ⚠️  ${file.name} ainda muito grande (${newSizeMB}MB), substituindo por placeholder...`);
        
        // Criar uma imagem placeholder pequena (1x1 pixel transparente)
        const placeholderPng = Buffer.from([
          0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
          0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
          0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00,
          0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
          0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49,
          0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
        ]);
        
        fs.writeFileSync(file.path, placeholderPng);
        console.log(`   ✅ ${file.name} substituído por placeholder (${placeholderPng.length} bytes)`);
      }
      
    } catch (error) {
      console.error(`❌ Erro ao otimizar ${file.name}:`, error.message);
    }
  }
  
  console.log('✅ Otimização de imagens concluída!');
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  optimizeImages().catch(error => {
    console.error('❌ Erro na otimização:', error);
    process.exit(1);
  });
}

export default optimizeImages;
