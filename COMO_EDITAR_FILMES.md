# 🎬 Como Editar Informações dos Filmes

## 🎯 **FONTE ÚNICA DE VERDADE**

Agora você só precisa editar **UM ARQUIVO** para alterar qualquer informação dos filmes:

📁 **`src/constants/movies.ts`** - Este é o único arquivo que você precisa editar!

---

## 📝 **Como Editar um Filme**

### **1. Informações Básicas do Filme**

No array `MOVIES` (linhas 20-95), edite:

```typescript
{
  id: 1,                                    // ← ID único do filme
  title: "The Pijama Dreamer",              // ← Título do filme
  image: thePijamaDreamerPoster,            // ← Imagem do poster
  genre: "Romance, Animação, Fantasia",     // ← Gêneros (separados por vírgula)
  romanticDescription: "Sofia embarca...",  // ← Descrição romântica
  year: 2025,                               // ← Ano do filme
  rating: "10★",                            // ← Classificação/rating
  specialPhotos: [...]                      // ← Fotos especiais (opcional)
}
```

### **2. Detalhes Específicos do Filme**

Na função `getMovieSpecificDetails` (linhas 25-150), edite o case correspondente:

```typescript
case 1: // ← ID do filme
  return {
    duration: 'Uma noite inteira de sonhos',           // ← Duração criativa
    classification: 'L - Livre para sonhar',           // ← Classificação criativa
    genres: ['Romance', 'Animação', 'Fantasia'],       // ← Gêneros como array
    tags: ['Romântico', 'Ethereal', 'Mágico'],        // ← Tags descritivas
    romanticQuote: 'Nos sonhos encontramos...'         // ← Frase romântica
  };
```

---

## 🔧 **Exemplos Práticos**

### **Exemplo 1: Alterar Título de um Filme**

```typescript
// ANTES
title: "The Pijama Dreamer",

// DEPOIS  
title: "O Sonhador de Pijama",
```

### **Exemplo 2: Alterar Descrição Romântica**

```typescript
// ANTES
romanticDescription: "Sofia embarca em uma jornada noturna...",

// DEPOIS
romanticDescription: "Uma nova aventura emocionante que vai te surpreender!",
```

### **Exemplo 3: Alterar Gêneros e Tags**

```typescript
// ANTES
genres: ['Romance', 'Animação', 'Fantasia'],
tags: ['Romântico', 'Ethereal', 'Mágico'],

// DEPOIS
genres: ['Ação', 'Aventura', 'Ficção Científica'],
tags: ['Empolgante', 'Dinâmico', 'Futurista'],
```

### **Exemplo 4: Alterar Frase Romântica**

```typescript
// ANTES
romanticQuote: 'Nos sonhos encontramos nossa verdade mais profunda...',

// DEPOIS
romanticQuote: 'O amor verdadeiro transcende todos os universos!',
```

---

## 🆕 **Como Adicionar um Novo Filme**

### **Passo 1: Adicionar ao Array MOVIES**

```typescript
{
  id: 10,                                    // ← Próximo ID disponível
  title: "Novo Filme Incrível",
  image: novoFilmePoster,                    // ← Importar imagem
  genre: "Comédia, Romance",
  romanticDescription: "Uma história emocionante...",
  year: 2025,
  rating: "10★"
}
```

### **Passo 2: Adicionar Detalhes Específicos**

```typescript
// Na função getMovieSpecificDetails
case 10: // ← Mesmo ID do filme
  return {
    duration: 'Uma aventura inesquecível',
    classification: 'L - Livre para sonhar',
    genres: ['Comédia', 'Romance'],
    tags: ['Divertido', 'Romântico', 'Inesquecível'],
    romanticQuote: 'O amor verdadeiro sempre encontra um jeito!'
  };
```

### **Passo 3: Importar Imagens (se necessário)**

```typescript
// No topo do arquivo
import novoFilmePoster from '@/assets/novo-filme/poster.png';
```

---

## 🗑️ **Como Remover um Filme**

### **Passo 1: Remover do Array MOVIES**
- Encontre o objeto do filme no array `MOVIES`
- Delete todo o objeto `{ id: X, title: "...", ... }`

### **Passo 2: Remover Detalhes Específicos**
- Na função `getMovieSpecificDetails`
- Delete o case correspondente: `case X: return { ... };`

### **Passo 3: Remover Imports (se não usado em outros filmes)**
- Delete a linha de import da imagem do filme

---

## ⚠️ **Regras Importantes**

### **✅ FAÇA**
- ✅ Edite apenas o arquivo `src/constants/movies.ts`
- ✅ Mantenha os IDs únicos e sequenciais
- ✅ Use arrays para `genres` e `tags`
- ✅ Teste após fazer alterações (`npm run build`)

### **❌ NÃO FAÇA**
- ❌ Não edite outros arquivos para alterar filmes
- ❌ Não duplique IDs
- ❌ Não esqueça de atualizar ambos os locais (MOVIES + getMovieSpecificDetails)

---

## 🧪 **Como Testar Alterações**

```bash
# 1. Verificar se não há erros
npm run build

# 2. Executar o site
npm run dev

# 3. Abrir o filme editado no modal para ver as mudanças
```

---

## 🎉 **Resultado Final**

Com essa organização:

- ✅ **UM ARQUIVO** = Todas as informações dos filmes
- ✅ **FÁCIL MANUTENÇÃO** = Editar filmes é simples e rápido
- ✅ **SEM DUPLICAÇÃO** = Não há informações espalhadas
- ✅ **CONSISTÊNCIA** = Todos os dados centralizados
- ✅ **ESCALABILIDADE** = Fácil adicionar/remover filmes

---

## 📋 **Checklist para Editar Filmes**

- [ ] Abrir `src/constants/movies.ts`
- [ ] Encontrar o filme no array `MOVIES`
- [ ] Alterar informações básicas (título, descrição, etc.)
- [ ] Encontrar o case correspondente em `getMovieSpecificDetails`
- [ ] Alterar detalhes específicos (duração, tags, etc.)
- [ ] Executar `npm run build` para testar
- [ ] Verificar se as mudanças aparecem no site

**🎬 Agora você tem controle total dos filmes em um só lugar!**
