#!/usr/bin/env node

/**
 * Script para verificar se todos os ícones do Lucide React estão sendo importados corretamente
 * Este script previne erros de "Component is not defined"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ícones comuns do Lucide React usados no projeto
const COMMON_ICONS = [
  'Heart', 'User', 'Settings', 'Play', 'Plus', 'ThumbsUp', 'ThumbsDown',
  'Download', 'Share', 'X', 'Search', 'Bell', 'ChevronDown', 'ArrowLeft',
  'Users', 'Eye', 'Calendar', 'TrendingUp', 'Clock', 'Globe', 'Smartphone',
  'Monitor', 'Tablet', 'MapPin', 'Info', 'Check'
];

function findTsxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findTsxFiles(fullPath));
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function checkImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  
  // Verificar imports com versões específicas (problema comum)
  const versionImportRegex = /import\s+.*from\s+['"][^'"]*@[0-9]+\.[0-9]+\.[0-9]+['"]/g;
  const versionImports = content.match(versionImportRegex);
  if (versionImports) {
    versionImports.forEach(importStatement => {
      errors.push(`❌ ${filePath}: Import com versão específica: ${importStatement.trim()}`);
    });
  }
  
  // Verificar se o arquivo usa ícones do Lucide React
  const usesLucideIcons = COMMON_ICONS.some(icon => {
    const iconPattern = new RegExp(`<${icon}\\b`, 'g');
    return iconPattern.test(content);
  });
  
  if (usesLucideIcons) {
    // Verificar se há import do lucide-react
    const hasLucideImport = content.includes("from 'lucide-react'") || 
                           content.includes('from "lucide-react"');
    
    if (!hasLucideImport) {
      errors.push(`❌ ${filePath}: Usa ícones do Lucide React mas não importa 'lucide-react'`);
    } else {
      // Verificar se os ícones usados estão sendo importados
      const importMatch = content.match(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/);
      if (importMatch) {
        const importedIcons = importMatch[1].split(',').map(icon => icon.trim());
        
        COMMON_ICONS.forEach(icon => {
          // Verificar se o ícone é usado como componente JSX
          const iconPattern = new RegExp(`<${icon}\\b`, 'g');
          if (iconPattern.test(content)) {
            if (!importedIcons.includes(icon)) {
              errors.push(`❌ ${filePath}: Usa ${icon} mas não está importado`);
            }
          }
        });
      }
    }
  }
  
  return errors;
}

function main() {
  console.log('🔍 Verificando imports e versões de pacotes...\n');
  
  const srcDir = path.join(__dirname, '..', 'src');
  const files = findTsxFiles(srcDir);
  
  let totalErrors = 0;
  const allErrors = [];
  
  files.forEach(file => {
    const errors = checkImports(file);
    if (errors.length > 0) {
      allErrors.push(...errors);
      totalErrors += errors.length;
    }
  });
  
  if (totalErrors === 0) {
    console.log('✅ Todos os imports e versões estão corretos!');
  } else {
    console.log(`❌ Encontrados ${totalErrors} erros de import:\n`);
    allErrors.forEach(error => console.log(error));
    console.log('\n💡 Para corrigir:');
    console.log('   - Imports de ícones: import { IconName } from \'lucide-react\';');
    console.log('   - Imports com versão: remova @versão do import');
    process.exit(1);
  }
}

// Executar se for o arquivo principal
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { checkImports, COMMON_ICONS };
