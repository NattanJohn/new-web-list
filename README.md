# 📰 News Web List

Um agregador de notícias moderno, responsivo e **altamente acessível**, construído com as melhores práticas de desenvolvimento fullstack. Implementa padrões avançados como Atomic Design, Context API sincronizados, e testes automatizados.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?style=flat-square&logo=jest)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![SCSS](https://img.shields.io/badge/SCSS-Modules-CD6799?style=flat-square&logo=sass)

---

## ✨ Features Principais

### 🎨 Tema Dinâmico (Light/Dark Mode)
- **Tema Claro**: Excelente para leitura durante o dia com cores suaves e alto contraste
- **Tema Escuro**: Modo noturno que reduz fadiga ocular em ambientes com pouca luz
- **Persistência**: Preferência de tema salva no `localStorage` 
- **SSR-Safe**: Evita hydration mismatch renderizando inicialmente sem tema específico
- **Transições Suaves**: Animações fluidas ao trocar entre temas

### ♿ Modo de Acessibilidade Avançado

O projeto implementa 4 recursos de acessibilidade essenciais em um modal intuitivo:

#### 1️⃣ **Tamanho do Texto** (Font Scale)
   - 5 níveis de escala: 1x (padrão), 1.25x, 1.5x, 1.75x e 2x
   - Redimensiona dinamicamente todos os componentes
   - Ideal para usuários com baixa visão

#### 2️⃣ **Espaçamento entre Linhas** (Line Height)
   - 4 opções: Padrão, 1.3x, 1.6x, 2x
   - Melhora significativamente a legibilidade para dislexia
   - Aplicado globalmente em todo o conteúdo

#### 3️⃣ **Alto Contraste** (High Contrast Mode)
   - Aumenta a saturação de cores
   - Reforça bordas e separações visuais
   - Essencial para usuários com baixa visão

#### 4️⃣ **Modo Escala de Cinza** (Grayscale)
   - Remove cores para facilitar leitura
   - Auxilia usuários com discromatopsia
   - Mantém clareza e hierarquia visual

**💾 Todas as preferências são persistidas no `localStorage`!**

### 📱 Design Responsivo
- Mobile-first approach
- Funciona perfeitamente em smartphones, tablets e desktops
- Imagens otimizadas com `next/image`
- Preconnect e preload de recursos críticos

### ⚡ Performance
- Carregamento lazy de imagens
- CSS Modules para estilos isolados
- **Paginação via URL Query Params** (`/?page=2`)
- Preload automático da primeira imagem
- Mínimo de JavaScript no bundle
- SSR-friendly (sem hydration errors)

### 📚 Arquitetura Limpa com Atomic Design

O projeto segue o padrão **Atomic Design**, uma filosofia de design que trata componentes como átomos em uma estrutura hierárquica. Isso proporciona **reutilização, manutenibilidade e consistência**.

#### 🔬 **O que é Atomic Design?**

Assim como a química organiza a matéria em níveis (átomos → moléculas → organismos), o Atomic Design organiza componentes UI de forma crescente em complexidade:

| Nível | Descrição | Exemplo |
|-------|-----------|---------|
| **Atoms** | Menores unidades indivisíveis. São "blocos de construção" | Button, Icon, Title, Input, Label |
| **Molecules** | Grupos de átomos ligados entre si. Têm uma função específica | PostCard (Title + Date + Summary), SearchBox (Input + Button) |
| **Organisms** | Grupos de moléculas combinadas. Componentes sofisticados e auto-suficientes | ArticleList, ArticleDetail, AccessibilityModal |
| **Templates** | Estrutura de páginas. Combinam organismos e moléculas | HomeTemplate |

#### 🏗️ **Estrutura no Projeto**

```
src/components/
├── atoms/                    # Elementos básicos e semânticas (h1, h2, h3)
│   ├── ThemeButton/         # Botão tema (atom complexo)
│   ├── BackButton/          # Botão voltar
│   ├── PostImage/           # Imagem otimizada
│   ├── Skeleton/            # Carregamento (padrão)
│   ├── Pagination/          # Paginação
│   ├── Title/               # Titulo
│   └── EmptyState/          # Estado vazio customizável
│
├── molecules/               # Combinações simples de atoms
│   ├── PostCard/            # Title + Date + Summary + Link com microdata
│   └── AccessibilityButton/ # Eye Icon + Text
│
├── organisms/               # Componentes complexos auto-suficientes
│   ├── ArticleList/         # Lista completa com paginação via URL
│   ├── ArticleDetail/       # Artigo completo com Schema.org microdata
│   ├── AccessibilityModal/  # Modal com 4 controles de a11y
│   ├── Header/              # Cabeçalho com título do site
│   └── Footer/              # Rodapé
│
└── templates/               # Layouts compartilhados
    ├── HomeTemplate/        # Header + Main + Footer
    ├── ArticleTemplate/     # Layout para artigos
    └── StatusTemplate/      # Layout para páginas de erro
```

#### 💡 **Benefícios**

- ✅ **Reutilização**: Atoms são usados em múltiplas molecules
- ✅ **Manutenibilidade**: Mudanças em um atom afetam todos os componentes
- ✅ **Escalabilidade**: Fácil adicionar novos componentes
- ✅ **Testes**: Cada nível tem responsabilidades claras
- ✅ **Documentação**: Estrutura intuitiva para novos desenvolvedores

---

### 🧠 **Context API & State Management**

O projeto implementa **2 contextos independentes mas sincronizados**:

#### 1️⃣ **ThemeContext** (Tema Light/Dark)
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: (theme: Theme) => void;
}
```
- Gerencia apenas o tema (light/dark)
- Modifica `data-theme` no DOM
- Preserva alto contraste quando ativo (mantém sufixo `-high-contrast` ao alterar tema)
- Persiste em `localStorage` com chave `gazeta-theme`

#### 2️⃣ **AccessibilityContext** (4 Controles de A11y)
```typescript
interface AccessibilityState {
  fontSize: number;        // 1 | 1.25 | 1.5 | 1.75 | 2
  lineHeight: number | 'normal';  // 'normal' | 1.3 | 1.6 | 2
  highContrast: boolean;   // true | false
  grayscale: boolean;      // true | false
}
```
- Gerencia 4 recursos de acessibilidade
- Modifica CSS variables (`--text-scale`, `--content-line-height`)
- Modifica `data-theme` (aplica variants high-contrast)
- Aplica `filter: grayscale(1)`
- Persiste em `localStorage` com chave `gazeta-news-acc`

#### 🔄 **Sincronização Entre Contextos**

Quando `ThemeContext` muda, o alto contraste é preservado se estiver ativo. A sincronização entre contextos e abas utiliza eventos nativos de `storage` (sem polling).

```typescript
// ThemeContext: preserva sufixo -high-contrast ao mudar tema
useEffect(() => {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme') || '';
  root.setAttribute(
    'data-theme',
    current.includes('-high-contrast') ? `${theme}-high-contrast` : theme
  );
}, [theme]);

// AccessibilityContext: aplica CSS vars e persiste config
useEffect(() => {
  const root = document.documentElement;
  root.style.setProperty('--text-scale', String(fontSize));
  root.style.setProperty(
    '--content-line-height',
    typeof lineHeight === 'number' ? String(lineHeight) : '1'
  );
  root.setAttribute('data-theme', highContrast ? `${theme}-high-contrast` : theme);
  root.style.filter = grayscale ? 'grayscale(1)' : 'none';
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}, [config, theme]);

// Sincronização entre abas/janelas sem polling
useEffect(() => {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      setConfig(JSON.parse(e.newValue));
    }
  };
  window.addEventListener('storage', onStorage);
  return () => window.removeEventListener('storage', onStorage);
}, []);
```

Nota: o modal e a flag de acessibilidade usam variáveis CSS locais para não herdarem a escala de fonte e a altura de linha do conteúdo.

---

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+ e npm/yarn
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/NattanJohn/new-web-list.git
cd news-web-list

# Renomeie os arquivos .env.example para .env
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Instale as dependências do frontend
cd frontend
npm install

# Instale as dependências do backend
cd ../backend
npm install
```

> **📝 Por que renomear `.env.example` para `.env`?**
> 
> - **`.env.example`**: Arquivo de exemplo commitado no repositório com valores placeholder
> - **`.env`**: Arquivo real com variáveis de ambiente da sua máquina (não é commitado, protegido em `.gitignore`)
> 
> A aplicação procura por `.env` em runtime, não por `.env.example`. Renomear permite que:
> - Cada desenvolvedor tenha seu próprio `.env` isolado
> - Credenciais e valores sensíveis não vazem no repositório
> - A aplicação encontre as variáveis corretas durante execução

### Rodando o Projeto

**Terminal 1 - Backend (Express):**
```bash
cd backend
npm start
# Servidor rodando em http://localhost:3001
```

**Terminal 2 - Frontend (Next.js):**
```bash
cd frontend
npm run dev
# Aplicação disponível em http://localhost:3000
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador! 🎉

### Rodando com Docker (frontend + backend)

```bash
# Build e sobe os serviços (frontend:3000, backend:3001)
docker-compose up --build

# Ou, após o primeiro build (mais rápido)
docker-compose up

# Para parar
docker-compose down
```

URLs:
- Frontend: http://localhost:3000
- Backend:  http://localhost:3001/articles

---

## 🐳 Arquitetura Docker

### Por que renderização dinâmica?

A home usa **renderização dinâmica** (`dynamic = 'force-dynamic'`) em todos os ambientes (dev, Docker e produção) porque:

1. **API não disponível no build**: Durante `docker-compose build`, o backend (`http://backend:3001`) não está rodando ainda.
2. **Sem pré-renderização estática**: Sem a API disponível no build, Next.js não consegue gerar HTML estático da home.
3. **Solução pragmática**: Renderizar dinamicamente em runtime quando a API já está disponível.

### Configuração

**Variáveis de Ambiente:**
- `NEXT_PUBLIC_API_URL=http://backend:3001` (frontend, apenas para build)
- `PORT=3001` (backend)

**Componentes:**
- Frontend: `next.config.mjs` (JavaScript, sem TypeScript em runtime)
- Backend: Node.js 18-alpine + Express
- Ambos na mesma rede Docker para comunicação interna

---

---

## 📁 Estrutura do Projeto

```
news-web-list/
├── backend/
│   ├── server.js          # Express API
│   ├── package.json
│   └── data/
│       └── news.json      # Base de dados de notícias
│
└── frontend/
    ├── src/
    │   ├── app/                    # Next.js App Router
    │   │   ├── page.tsx            # Página inicial (home)
    │   │   ├── layout.tsx          # Layout raiz com providers
    │   │   ├── error.tsx           # Error boundary global
    │   │   ├── not-found.tsx       # Página 404 customizada
    │   │   ├── globals.css         # Estilos globais + CSS variables
    │   │   └── article/[slug]/     # Página de artigo individual
    │   │       ├── page.tsx        # Server component com metadata
    │   │       └── loading.tsx     # Loading state
    │   │
    │   ├── components/             # Componentes React (Atomic Design)
    │   │   ├── atoms/              # Botões, títulos, ícones
    │   │   │   ├── BackButton/
    │   │   │   ├── EmptyState/
    │   │   │   ├── Pagination/
    │   │   │   ├── PostImage/
    │   │   │   ├── Skeleton/
    │   │   │   ├── ThemeButton/
    │   │   │   └── Title/          # h1/h2/h3 com tamanhos específicos
    │   │   │
    │   │   ├── molecules/          # Componentes compostos
    │   │   │   ├── AccessibilityButton/
    │   │   │   └── PostCard/       # Com Schema.org microdata
    │   │   │
    │   │   ├── organisms/          # Componentes complexos
    │   │   │   ├── AccessibilityModal/
    │   │   │   ├── ArticleDetail/  # Com microdata completo
    │   │   │   ├── ArticleList/    # Com paginação via URL
    │   │   │   ├── Footer/
    │   │   │   └── Header/
    │   │   │
    │   │   └── templates/          # Estrutura de páginas
    │   │       ├── ArticleTemplate/
    │   │       ├── HomeTemplate/
    │   │       └── StatusTemplate/
    │   │
    │   ├── context/                # State global (2 contextos)
    │   │   ├── ThemeContext.tsx    # Tema (light/dark) SSR-safe
    │   │   └── AccessibilityContext.tsx  # 4 controles de a11y
    │   │
    │   ├── hooks/                  # Custom React hooks
    │   │   └── useLocalStorage.ts  # Sincronização de localStorage
    │   │
    │   ├── services/               # Chamadas de API
    │   │   ├── api.ts              # Serviço HTTP com error handling
    │   │   └── api.test.ts         # Testes da API
    │   │
    │   ├── types/                  # TypeScript types
    │   │   ├── article.ts          # Article interface
    │   │   ├── error.ts            # Error types
    │   │   └── index.ts            # Exports centralizados
    │   │
    │   ├── utils/                  # Funções utilitárias
    │   │   ├── errorHandler.ts     # Handler unificado de erros API
    │   │   ├── formatDate.ts       # Formatação de datas
    │   │   └── localStorage.ts     # Safe localStorage helpers
    │   │
    │   └── styles/                 # SCSS global e design system
    │       └── variables.scss      # Variáveis (spacing, colors, etc)
    │
    ├── jest.config.js              # Configuração do Jest
    ├── setupTests.ts               # Setup dos testes
    ├── tsconfig.json               # TypeScript config
    ├── next.config.ts              # Next.js config
    └── package.json
```

#### **Padrões de Organização**

- **index.ts em cada pasta**: Exports centralizados
  ```typescript
  // src/components/atoms/index.ts
  export { Title } from './Title/Title';
  export { BackButton } from './BackButton/BackButton';
  export { ThemeButton } from './ThemeButton/ThemeButton';
  ```

- **Modules (SCSS)**: Cada componente tem seu próprio arquivo `.module.scss`
  ```typescript
  import styles from './Button.module.scss';
  <button className={styles.button}>Click</button>
  ```

- **Custom Hooks**: Lógica reutilizável extraída
  ```typescript
  // src/hooks/useLocalStorage.ts
  export const useLocalStorage = (key: string, initialValue: any) => {
    // Lógica sincronizada com localStorage
  };
  ```

- **Utility Functions**: Helpers puros
  ```typescript
  // src/utils/localStorage.ts
  export const safeLocalStorageGet = (key: string): string | null => {
    try { return localStorage.getItem(key); } 
    catch { return null; }
  };
  ```

---

## 🔧 Stack Técnico

### Frontend
| Tecnologia | Versão | Propósito |
|---|---|---|
| **Next.js** | 16.1.1 | Framework React com SSR |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5 | Type safety |
| **Sass/SCSS** | CSS Modules | Estilos isolados |
| **Jest** | 30.2.0 | Testing framework |
| **React Testing Library** | 16.3.1 | Testes de componentes |
| **MSW** | 2.12.4 | Mock de API em testes |
| **lucide-react** | Icons | Ícones SVG |

### Backend
| Tecnologia | Propósito |
|---|---|
| **Node.js** | Runtime JavaScript |
| **Express.js** | Framework HTTP |
| **JSON** | Base de dados local |

---

## 🔧 Padrões de Implementação

### 1️⃣ **Safe localStorage Helpers**

Evita erros de acesso (SSR, user permissions, etc):

```typescript
// src/utils/localStorage.ts
export const safeLocalStorageGet = <T = string>(key: string): T | null => {
  try {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Erro ao ler localStorage[${key}]:`, error);
    return null;
  }
};

export const safeLocalStorageSet = <T = unknown>(key: string, value: T): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Erro ao escrever localStorage[${key}]:`, error);
  }
};
```

### 2️⃣ **Error Handler Unificado**

Tratamento consistente de erros de API:

```typescript
// src/utils/errorHandler.ts
import { ApiError } from '@/services/api';

export const handleApiError = (err: unknown): string => {
  if (err instanceof ApiError) {
    return err.message || 'Erro na requisição';
  }
  
  if (err instanceof Error) {
    return err.message;
  }
  
  return 'Não foi possível conectar ao servidor';
};

// Uso no código:
try {
  const data = await api.getArticles();
} catch (err) {
  setErrorMessage(handleApiError(err));
}
```

### 3️⃣ **Type-Safe API Service**

```typescript
// src/services/api.ts
export class ApiError extends Error {
  status?: number;
  code?: string;
  constructor(shape: { message: string; status?: number; code?: string }) {
    super(shape.message);
    this.name = 'ApiError';
    this.status = shape.status;
    this.code = shape.code;
  }
}

export const api = {
  async getArticles(): Promise<ArticleList> {
    const res = await fetch(`${API_URL}/articles`);
    if (!res.ok) throw new ApiError({ message: 'Erro ao buscar artigos', status: res.status });
    return res.json();
  },
  
  async getArticleBySlug(slug: string): Promise<Article | null> {
    const res = await fetch(`${API_URL}/articles/${encodeURIComponent(slug)}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new ApiError({ message: 'Erro ao buscar artigo', status: res.status });
    return res.json();
  }
};
```

### 4️⃣ **Paginação via URL Query Params**

Melhor prática para SEO e UX (compartilhável, botão voltar funciona):

```typescript
// src/components/organisms/ArticleList/ArticleList.tsx
import { useRouter, useSearchParams } from 'next/navigation';

export const ArticleList = ({ initialArticles }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Ler página da URL (SSR-safe)
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page'); // URL limpa: / ao invés de /?page=1
    } else {
      params.set('page', String(page));
    }
    
    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.push(newUrl, { scroll: false });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // ... resto do código
};
```

### 5️⃣ **SEO com Schema.org Microdata**

Implementação de microdata para melhor indexação e rich snippets:

```tsx
// src/components/organisms/ArticleDetail/ArticleDetail.tsx
<article 
  className={styles.article}
  itemScope 
  itemType="https://schema.org/NewsArticle"
>
  <header className={styles.header}>
    <Title tag="h1">
      <span itemProp="headline">{article.title}</span>
    </Title>
    <div className={styles.meta}>
      <time dateTime={article.date} itemProp="datePublished">
        Publicado em: {formattedDate}
      </time>
      <span itemProp="author" itemScope itemType="https://schema.org/Person">
        Por: <span itemProp="name">{author}</span>
      </span>
    </div>
  </header>
  
  <figure className={styles.featuredImage} itemProp="image" itemScope itemType="https://schema.org/ImageObject">
    <PostImage priority src={article.image} alt={article.title} />
    <meta itemProp="url" content={article.image} />
  </figure>

  <div className={styles.content} itemProp="articleBody">
    {/* conteúdo do artigo */}
  </div>
</article>
```

### 6️⃣ **Hierarquia Semântica de Headings**

Tamanhos específicos e pesos diferentes para h1, h2, h3:

```scss
// src/components/atoms/Title/Title.module.scss
.title {
  font-family: var(--font-main);
  color: var(--text-color);
  line-height: 1.2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: none;
}

/* h1 - Maior, para páginas principais */
h1.title {
  font-size: clamp(1.75rem, 5vw, 3rem);
  font-weight: 900;
}

/* h2 - Médio, para posts em cards */
h2.title {
  font-size: clamp(1.25rem, 3vw, 1.875rem);
  font-weight: 800;
}

/* h3 - Pequeno, para subtítulos */
h3.title {
  font-size: clamp(1.rem, 2.5vw, 1.5rem);
  font-weight: 700;
}
```

---

## 🎨 Temas CSS

### Variáveis Globais

O projeto utiliza CSS variables para tema dinâmico:

```scss
// Light Mode
--bg-primary: #ffffff
--text-primary: #1a1a1a
--border-color: #dddddd

// Dark Mode
--bg-primary: #1a1a1a
--text-primary: #ffffff
--border-color: #333333

// Acessibilidade
--text-scale: 1               // 1x até 2x
--content-line-height: 1.5    // 1.5 até 2
--a11y-font-scale: 1          // Alias para --text-scale
```

## 🌍 Variáveis de Ambiente

**Frontend (`frontend/.env.example`):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend (`backend/.env.example`):**
```bash
PORT=3001
NODE_ENV=development
```

---

## 📱 Funcionalidades por Página

### Home (`/` ou `/?page=2`)
- Lista paginada de todas as notícias (6 por página)
- **Paginação via URL query params** - compartilhável e SEO-friendly
- Skeleton loading durante carregamento
- Empty state se não houver artigos
- Cards com Schema.org NewsArticle microdata
- Primeira imagem com preload automático
- Botão voltar do navegador funciona corretamente

### Artigo (`/article/[slug]`)
- Exibe artigo completo com Schema.org NewsArticle microdata
- Metadata dinâmica (OpenGraph, Twitter Cards, JSON-LD)
- Imagem de capa otimizada com `next/image`
- Data de publicação formatada e autor
- Botão de voltar com histórico do navegador
- Conteúdo organizado em parágrafos
- Fallback para 404 se artigo não existir

### Páginas de Erro
- **404 Not Found** - Página personalizada com link para home
- **Error Boundary** - Captura erros de runtime com botão de retry
- **Empty State** - Componente reutilizável para estados vazios

---

## ✅ Checklist de Features

### 🏗️ Arquitetura & Fundamentos
- ✅ TypeScript em 100% do código frontend
- ✅ Next.js 16.1 com App Router e SSR
- ✅ Atomic Design pattern (4 níveis: atoms/molecules/organisms/templates)
- ✅ Context API para state global (ThemeContext, AccessibilityContext)
- ✅ CSS Modules para estilos isolados

### 🎨 UI/UX & Design
- ✅ Responsivo (mobile/tablet/desktop)
- ✅ Tema dark/light mode com transições suaves
- ✅ SSR-safe theme loading (mounted state pattern)
- ✅ Hierarquia semântica de headings (h1/h2/h3 com tamanhos específicos)
- ✅ Loading states com skeleton components
- ✅ Empty states customizáveis

### ♿ Acessibilidade
- ✅ 4 controles de acessibilidade (font-size, line-height, contrast, grayscale)
- ✅ Modal de acessibilidade persistente
- ✅ Labels ARIA em elementos interativos
- ✅ Navegação por teclado

### 🚀 Performance & SEO
- ✅ Imagens otimizadas com next/image
- ✅ Lazy loading e code splitting
- ✅ Schema.org microdata (NewsArticle, Person, ImageObject)
- ✅ Metadata dinâmica (OpenGraph, Twitter Cards)
- ✅ Paginação via URL query params (/?page=2)
- ✅ Primeira imagem com preload

### 🧪 Qualidade de Código
- ✅ Testes com Jest + RTL (6 testes passando)
- ✅ API service com error handling
- ✅ Handler unificado de erros (errorHandler.ts)
- ✅ Type-safe com TypeScript strict mode
- ✅ Error boundaries + páginas 404 customizadas

### 🔄 Funcionalidades
- ✅ Roteamento dinâmico ([slug])
- ✅ Paginação compartilhável via URL
- ✅ Histórico do navegador funcionando corretamente
- ✅ Botão voltar com useRouter
- ✅ API RESTful com Express.js

---

## 🧪 Testes

O projeto utiliza **Jest** e **React Testing Library** para testes automatizados.

### Setup de Testes

```typescript
// frontend/setupTests.ts
import '@testing-library/jest-dom';

// Mock de next/navigation para testes
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));
```

### Executando Testes

```bash
cd frontend
npm test                  # Roda todos os testes
npm test -- --coverage    # Gera relatório de cobertura
```

### Testes Atuais

- ✅ **PostCard.test.tsx** - Renderização do card, links, imagens
- ✅ **ArticleList.test.tsx** - Lista, paginação, empty state, loading
- ✅ **api.test.ts** - Chamadas de API, error handling

**Resultado:** 6 testes em 3 suites (todos passando)

### Exemplo de Teste com Mocks de Navegação

```typescript
// ArticleList.test.tsx
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation');

describe('ArticleList', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams('page=1')
    );
  });

  it('deve navegar para próxima página', () => {
    // Teste implementado
  });
});
```

---

## 🐛 Tratamento de Erros

O projeto implementa tratamento robusto de erros em múltiplas camadas:

- **Handler Unificado**: `errorHandler.ts` para tratamento consistente de erros API
- **ApiError Customizado**: Classe especializada para erros de requisição HTTP
- **Error Boundaries**: Páginas error.tsx e not-found.tsx para fallbacks visuais
- **Empty States**: Componente reutilizável para estados vazios

Veja detalhes na seção [Padrões de Implementação](#🔧-padrões-de-implementação).

---

## 📄 Licença

Este projeto é de código aberto sob a licença MIT.

---

## 👨‍💻 Desenvolvido com ❤️

Desenvolvido como solução para desafio fullstack junior com foco em **acessibilidade**, **performance** e **boas práticas de código**.
