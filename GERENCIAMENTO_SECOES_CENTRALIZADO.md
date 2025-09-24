# Sistema Centralizado de Gerenciamento de Seções

## 🎯 **Arquivo Principal**

Todo o gerenciamento de seções/categorias agora está centralizado em um único arquivo:

```
src/components/ui/movie-sections-ui.tsx
```

## 🔧 **Como Funciona**

### Configuração das Seções

No topo do arquivo `movie-sections-ui.tsx`, você encontrará a configuração `MOVIE_SECTIONS`:

```typescript
const MOVIE_SECTIONS: MovieSection[] = [
  {
    id: 'continuar-assistindo',
    title: 'Continue assistindo nossa história',
    movieIds: ["the-pijama-dreamer", "casal-aranha-teia-do-julgamento", "roupa-preta-coracao-azul"],
    gridLayout: 'continue',
    maxItems: 3
  },
  {
    id: 'porque-se-apaixonou-por-sofia',
    title: 'Por que você se apaixonou por: Sofia',
    movieIds: ["the-pijama-dreamer", "casal-aranha-teia-do-julgamento", "amor-em-alta-velocidade", "aventura-estelar", "motim-estelar"],
    gridLayout: 'poster',
    maxItems: 6
  },
  // ... outras seções
];
```

### Propriedades de Cada Seção

- **`id`**: Identificador único da seção
- **`title`**: Título que aparece na interface
- **`movieIds`**: Array com os IDs dos filmes que aparecem nesta seção
- **`gridLayout`**: Tipo de layout (continue, poster, horizontal)
- **`maxItems`**: Número máximo de filmes a exibir (opcional)

## ✨ **Como Editar as Seções**

### 1. Adicionar um Filme a uma Seção

```typescript
{
  id: 'porque-se-apaixonou-por-sofia',
  title: 'Por que você se apaixonou por: Sofia',
  movieIds: ["the-pijama-dreamer", "casal-aranha-teia-do-julgamento", "amor-em-alta-velocidade", "aventura-estelar"], // Adicionei "aventura-estelar"
  gridLayout: 'poster',
  maxItems: 6
}
```

### 2. Remover um Filme de uma Seção

```typescript
{
  id: 'talvez-voce-goste',
  title: 'Talvez você goste',
  movieIds: ["roupa-preta-coracao-azul", "dilema-do-amor", "beijo-estrelado"], // Removi "troca-troca-juridico"
  gridLayout: 'horizontal',
  maxItems: 4
}
```

### 3. Criar uma Nova Seção

```typescript
{
  id: 'minha-nova-secao',
  title: 'Minha Nova Seção',
  movieIds: ["the-pijama-dreamer", "beijo-estrelado", "amor-em-cascata"],
  gridLayout: 'horizontal',
  maxItems: 4
}
```

## 📋 **IDs dos Filmes Disponíveis**

- `"the-pijama-dreamer"` - The Pijama Dreamer
- `"casal-aranha-teia-do-julgamento"` - Casal-Aranha: Teia do Julgamento
- `"roupa-preta-coracao-azul"` - Roupa Preta Coração Azul
- `"dilema-do-amor"` - Dilema do Amor
- `"beijo-estrelado"` - Beijo Estrelado
- `"amor-em-alta-velocidade"` - Amor em Alta Velocidade
- `"troca-troca-juridico"` - Troca Troca Jurídico
- `"motim-estelar"` - Motim Estelar
- `"amor-em-cascata"` - Amor em Cascata
- `"aventura-estelar"` - Aventura Estelar

## 🎨 **Tipos de Layout**

### `continue`
- Layout para "Continue assistindo" (ÚNICO layout horizontal)
- Grid 3 colunas com barra de progresso
- Aspect ratio 16:9 (horizontal)

### `poster`
- Layout padrão para todas as outras seções
- Grid responsivo (2-6 colunas)
- Aspect ratio 2:3 (retrato/vertical)
- Padrão de exibição como na seção "Por que você se apaixonou por: Sofia"

### `horizontal` (DEPRECATED)
- Não é mais usado
- Todas as seções agora usam layout `poster` (retrato)

## 🔄 **Seções Configuradas**

1. **"Continue assistindo nossa história"** - 3 filmes em layout horizontal (aspect-video) com barra de progresso
2. **"Por que você se apaixonou por: Sofia"** - 6 filmes em layout poster (aspect-[2/3])
3. **"Talvez você goste"** - 4 filmes em layout poster (aspect-[2/3])
4. **"Top 10 do Marcelo"** - 4 filmes em layout poster (aspect-[2/3]) com numeração
5. **"Baseado em uma história real: A nossa"** - 4 filmes em layout poster (aspect-[2/3]) com badge "Real"
6. **"Romances emocionantes"** - 4 filmes em layout poster (aspect-[2/3]) com badge "♥"

### 📐 **Padrão de Layout:**
- **"Continue assistindo"**: ÚNICA seção com posters horizontais (aspect-video)
- **Todas as outras seções**: Posters em retrato (aspect-[2/3]) como padrão

## ⚡ **Vantagens do Sistema Centralizado**

- ✅ **Um único local** para gerenciar todas as seções
- ✅ **UI mantida** - Toda a aparência e comportamento preservados
- ✅ **Fácil edição** - Apenas mude os IDs dos filmes
- ✅ **Atualização automática** - Mudanças aparecem em tempo real
- ✅ **Flexível** - Pode criar novas seções facilmente
- ✅ **Organizado** - Cada seção tem seu próprio layout e estilo

## 🚀 **Como Adicionar uma Nova Seção**

1. Adicione um novo objeto no array `MOVIE_SECTIONS`
2. Configure as propriedades (id, title, movieIds, gridLayout, maxItems)
3. Adicione a seção no JSX do componente
4. Escolha o layout apropriado (continue, poster, ou horizontal)

## ⚠️ **Importante**

- **Sempre use IDs descritivos** para os filmes
- **Mantenha IDs únicos** para as seções
- **Teste as mudanças** após editar
- **Respeite o maxItems** para manter a UI organizada
- **Use layouts apropriados** para cada tipo de seção

Agora você tem controle total sobre todas as seções em um único arquivo! 🎬✨
