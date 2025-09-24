# Sistema de Gerenciamento de Categorias de Filmes

Este documento explica como gerenciar quais filmes aparecem em quais categorias no Soflix.

## 📁 Arquivo Principal

O arquivo principal para gerenciar as categorias é:
```
src/constants/categories.ts
```

## 🎯 Como Funciona

### Estrutura de uma Categoria

Cada categoria tem as seguintes propriedades:

```typescript
{
  id: string;                    // ID único da categoria
  title: string;                 // Título que aparece na tela
  description?: string;          // Descrição opcional
  movieIds: string[];           // IDs dos filmes que aparecem nesta categoria (IDs descritivos)
  displayOrder: number;         // Ordem de exibição (0 = primeiro)
  isActive: boolean;            // Se a categoria está ativa ou não
}
```

### Categorias Pré-definidas

O sistema já vem com as seguintes categorias configuradas:

1. **"Porque se apaixonou por Sofia"** - Os filmes que contam nossa história de amor
2. **"Talvez você goste"** - Recomendações baseadas nos seus gostos
3. **"Top 10 do Marcelo"** - Os favoritos pessoais do Marcelo
4. **"Baseado em uma história real: A nossa"** - Histórias que realmente aconteceram
5. **"Continuar assistindo"** - Onde você parou de assistir
6. **"Romances emocionantes"** - Para chorar de emoção
7. **"Ação e Aventura"** - Para quem gosta de adrenalina
8. **"Comédia e Diversão"** - Para rir até chorar
9. **"Drama e Suspense"** - Para quem gosta de emoção

## 🔧 Como Editar as Categorias

### Adicionar um Filme a uma Categoria

1. Abra o arquivo `src/constants/categories.ts`
2. Encontre a categoria desejada
3. Adicione o ID descritivo do filme no array `movieIds`

Exemplo:
```typescript
{
  id: 'porque-se-apaixonou-por-sofia',
  title: 'Porque se apaixonou por Sofia',
  movieIds: ["the-pijama-dreamer", "casal-aranha-teia-do-julgamento", "amor-em-alta-velocidade", "aventura-estelar"], // Adicionei "aventura-estelar"
  // ... outras propriedades
}
```

### Remover um Filme de uma Categoria

1. Abra o arquivo `src/constants/categories.ts`
2. Encontre a categoria desejada
3. Remova o ID descritivo do filme do array `movieIds`

### Criar uma Nova Categoria

1. Abra o arquivo `src/constants/categories.ts`
2. Adicione um novo objeto no array `MOVIE_CATEGORIES`
3. Defina todas as propriedades necessárias

Exemplo:
```typescript
{
  id: 'minha-nova-categoria',
  title: 'Minha Nova Categoria',
  description: 'Descrição da nova categoria',
  movieIds: ["the-pijama-dreamer", "roupa-preta-coracao-azul", "beijo-estrelado"], // IDs descritivos dos filmes que devem aparecer
  displayOrder: 10, // Ordem de exibição
  isActive: true // Ativa a categoria
}
```

### Desabilitar uma Categoria

1. Abra o arquivo `src/constants/categories.ts`
2. Encontre a categoria desejada
3. Mude `isActive: true` para `isActive: false`

### Alterar a Ordem das Categorias

1. Abra o arquivo `src/constants/categories.ts`
2. Modifique a propriedade `displayOrder` das categorias
3. Categorias com números menores aparecem primeiro

## 📋 Lista de IDs dos Filmes

Para facilitar a edição, aqui estão os IDs descritivos dos filmes disponíveis:

- **"the-pijama-dreamer"**: The Pijama Dreamer
- **"casal-aranha-teia-do-julgamento"**: Casal-Aranha: Teia do Julgamento
- **"roupa-preta-coracao-azul"**: Roupa Preta Coração Azul
- **"dilema-do-amor"**: Dilema do Amor
- **"beijo-estrelado"**: Beijo Estrelado
- **"amor-em-alta-velocidade"**: Amor em Alta Velocidade
- **"troca-troca-juridico"**: Troca Troca Jurídico
- **"motim-estelar"**: Motim Estelar
- **"amor-em-cascata"**: Amor em Cascata
- **"aventura-estelar"**: Aventura Estelar

✨ **Vantagem dos IDs descritivos**: Agora você pode entender facilmente qual filme é apenas olhando o ID!

## 🔍 Funções Úteis

O sistema fornece várias funções úteis:

- `getMoviesFromCategory(categoryId, allMovies)` - Obtém filmes de uma categoria
- `getActiveCategories()` - Obtém todas as categorias ativas
- `getCategoryById(categoryId)` - Obtém uma categoria específica
- `isMovieInCategory(movieId, categoryId)` - Verifica se um filme está em uma categoria
- `getCategoriesForMovie(movieId)` - Obtém todas as categorias que contêm um filme

## ⚠️ Importante

- **Sempre use IDs descritivos** para os filmes (strings com letras, números e hífens)
- **Mantenha IDs únicos** para as categorias
- **Teste as mudanças** após editar o arquivo
- **Categorias desabilitadas** (`isActive: false`) não aparecem na interface
- **Categorias vazias** (sem filmes) não aparecem na interface

## 🎨 Personalização

Você pode criar categorias com qualquer nome e organizar os filmes como desejar. O sistema é flexível e permite:

- Categorias temáticas (por gênero, ano, etc.)
- Categorias pessoais (favoritos, assistidos, etc.)
- Categorias sazonais (natal, verão, etc.)
- Categorias especiais (premiações, clássicos, etc.)

## 🔄 Atualização Automática

Após editar o arquivo `categories.ts`, as mudanças são aplicadas automaticamente em:

- **MovieSections**: Seção "Continuar assistindo"
- **NetflixCategories**: Todas as outras categorias
- **Interface**: Ordem e visibilidade das categorias

Não é necessário reiniciar o servidor - as mudanças são aplicadas em tempo real!

## ✨ Exemplo Prático de Edição

Para adicionar "Aventura Estelar" à categoria "Porque se apaixonou por Sofia":

```typescript
// ANTES:
movieIds: ["the-pijama-dreamer", "casal-aranha-teia-do-julgamento", "amor-em-alta-velocidade"]

// DEPOIS:
movieIds: ["the-pijama-dreamer", "casal-aranha-teia-do-julgamento", "amor-em-alta-velocidade", "aventura-estelar"]
```

✨ **Muito mais fácil!** Agora você não precisa decorar números, basta usar o nome descritivo do filme!

## 🎯 Categorias Pré-configuradas

O sistema já vem com estas categorias configuradas:

1. **"Porque se apaixonou por Sofia"** - `["the-pijama-dreamer", "casal-aranha-teia-do-julgamento", "amor-em-alta-velocidade"]`
2. **"Talvez você goste"** - `["roupa-preta-coracao-azul", "dilema-do-amor", "beijo-estrelado"]`
3. **"Top 10 do Marcelo"** - `["the-pijama-dreamer", "motim-estelar", "amor-em-cascata"]`
4. **"Baseado em uma história real: A nossa"** - `["amor-em-cascata", "amor-em-alta-velocidade", "troca-troca-juridico"]`
5. **"Continuar assistindo"** - `["the-pijama-dreamer", "casal-aranha-teia-do-julgamento", "roupa-preta-coracao-azul"]`

Simples assim! 🎬✨
