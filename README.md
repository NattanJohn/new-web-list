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
- **Persistência**: Preferência de tema salva no `localStorage` e sincronizada entre abas
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
- Paginação de 6 artigos por página
- Preload automático da primeira imagem
- Mínimo de JavaScript no bundle

### 🧪 Testes Automatizados
- **Jest** com **React Testing Library**
- Mock Service Worker para testes da API
- Cobertura de componentes principais
- 6 testes passando em 3 suites diferentes

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
├── atoms/                    # Elementos básicos e isolados
│   ├── Title/               # Título com variações
│   ├── ThemeButton/         # Botão tema (atom complexo)
│   ├── BackButton/          # Botão voltar
│   ├── PostImage/           # Imagem otimizada
│   ├── Skeleton/            # Carregamento (padrão)
│   ├── Pagination/          # Paginação
│   └── EmptyState/          # Estado vazio customizável
│
├── molecules/               # Combinações simples de atoms
│   ├── PostCard/            # Atom: Title + Date + Summary + Link
│   └── AccessibilityButton/ # Atom: Eye Icon + Text
│
├── organisms/               # Componentes complexos auto-suficientes
│   ├── ArticleList/         # Lista completa com paginação
│   ├── ArticleDetail/       # Artigo completo com metadados
│   └── AccessibilityModal/  # Modal com 4 controles de a11y
│
└── templates/               # Layouts compartilhados
    └── HomeTemplate/        # Header + Main + Footer
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

# Instale as dependências do frontend
cd frontend
npm install

# Instale as dependências do backend
cd ../backend
npm install
```

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

### Rodando os Testes

```bash
cd frontend
npm test              # Rodar testes uma vez
npm run test:watch   # Modo watch (reexecuta ao salvar)
```

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
    │   │   ├── article/[slug]/     # Página de artigo individual
    │   │   ├── layout.tsx          # Layout raiz
    │   │   ├── status/             # Páginas de status reutilizáveis
    │   │   │   ├── ErrorPage.tsx   # Erro genérico
    │   │   │   └── NotFoundPage.tsx# 404 not found
    │   │   └── globals.css         # Estilos globais
    │   │
    │   ├── components/             # Componentes React
    │   │   ├── atoms/              # Botões, títulos, ícones
    │   │   │   ├── ThemeButton/
    │   │   │   ├── Title/
    │   │   │   ├── Pagination/
    │   │   │   ├── Skeleton/
    │   │   │   └── Icons/
    │   │   │
    │   │   ├── molecules/          # Componentes compostos
    │   │   │   ├── PostCard/
    │   │   │   └── AccessibilityButton/
    │   │   │
    │   │   └── organisms/          # Componentes complexos
    │   │   |    ├── ArticleList/
    │   │   |    ├── ArticleDetail/
    │   │   |    └── AccessibilityModal/
    |   |   |
    |   |   └── templates/          # Estrutua de paginas
    │   │   |    ├── HomeTemplate/
    │   │
    │   ├── context/                # State global (2 contextos)
    │   │   ├── ThemeContext.tsx    # Tema (light/dark mode)
    │   │   └── AccessibilityContext.tsx  # 4 controles de a11y
    │   │
    │   ├── hooks/                  # Custom React hooks
    │   │   └── useLocalStorage.ts  # Sincronização de localStorage
    │   │
    │   ├── services/               # Chamadas de API
    │   │   └── api.ts              # Serviço HTTP com error handling
    │   │
    │   ├── types/                  # TypeScript types
    │   │   ├── article.ts          # Article interface
    │   │   ├── error.ts            # Erro types
    │   │   └── index.ts            # Exports centralizados
    │   │
    │   ├── utils/                  # Funções utilitárias
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

## 🎯 Componentes Principais

### Atoms
Unidades indivisíveis do design:
- **Title**: Títulos com variações de tag (h1, h2, h3)
- **BackButton**: Botão voltar com ícone
- **ThemeButton**: Menu tema com 2 opções
- **Pagination**: Navegação entre páginas
- **Skeleton**: Loading placeholder
- **PostImage**: Imagem otimizada para artigos
- **EmptyState**: Estado vazio customizável

### Molecules
Combinações simples de atoms:
- **PostCard**: Título + Data + Resumo + Link (usado em ArticleList)
- **AccessibilityButton**: Ícone Eye + Text "Acessibilidade"

### Organisms
Componentes complexos auto-suficientes:
- **ArticleList**: Lista com paginação, skeleton, empty state
- **ArticleDetail**: Artigo completo com imagem, data, botão voltar
- **AccessibilityModal**: Modal com 4 sliders/toggles de a11y

### Templates
Layouts compartilhados:
- **HomeTemplate**: Header (Title + ThemeButton) + Main + Footer

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

## 📋 Testes

### Estrutura de Testes

```
src/
├── components/
│   ├── molecules/PostCard/PostCard.test.tsx
│   └── organisms/ArticleList/ArticleList.test.tsx
│
└── services/
    └── api.test.ts
```

### Exemplo de Teste

```typescript
describe('PostCard', () => {
  it('renders title and summary', () => {
    render(<PostCard article={mockArticle} />);
    expect(screen.getByText('Article Title')).toBeInTheDocument();
  });
});
```

### Rodando Testes

```bash
npm test                    # Rodar uma vez
npm test -- --watch       # Modo watch
npm test -- --coverage    # Com cobertura
```

---

## 🔧 Padrões de Implementação

### 1️⃣ **Safe localStorage Helpers**

Evita erros de acesso (SSR, user permissions, etc):

```typescript
// src/utils/localStorage.ts
export const safeLocalStorageGet = (key: string): string | null => {
  try {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  } catch (error) {
    console.error(`Erro ao ler localStorage[${key}]:`, error);
    return null;
  }
};

export const safeLocalStorageSet = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Erro ao escrever localStorage[${key}]:`, error);
  }
};
```

### 2️⃣ **Custom Hooks para Lógica Reutilizável**

```typescript
// src/hooks/useLocalStorage.ts
export const useLocalStorage = <T,>(
  key: string, 
  initialValue: T
): [T, (value: T) => void] => {
  const [stored, setStored] = useState<T>(() => {
    const item = safeLocalStorageGet(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = useCallback((value: T) => {
    setStored(value);
    safeLocalStorageSet(key, JSON.stringify(value));
  }, [key]);

  return [stored, setValue];
};
```

### 3️⃣ **Type-Safe API Service**

```typescript
// src/services/api.ts
export const api = {
  get<T>(url: string): Promise<T> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`)
      .then(res => {
        if (!res.ok) throw new ApiError(res.status);
        return res.json();
      })
      .catch(error => {
        console.error(`API Error [${url}]:`, error);
        throw error;
      });
  }
};
```

### 4️⃣ **Error Boundaries & Error Pages**

```typescript
// src/app/error.tsx
'use client';

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>Algo deu errado</h2>
      <button onClick={() => reset()}>Tentar novamente</button>
    </div>
  );
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

### Home (`/`)
- Lista paginada de todas as notícias
- Skeleton loading durante carregamento
- Paginação interativa
- Busca visual através de cards

### Artigo (`/article/[slug]`)
- Exibe artigo completo
- Imagem de capa otimizada
- Formatted date
- Data de publicação legível
- Botão de voltar à home

---

## ✅ Checklist de Features

- ✅ TypeScript em todo o projeto
- ✅ Componentes React funcionais
- ✅ Context API para state global
- ✅ CSS Modules para estilos isolados
- ✅ Responsivo (mobile/tablet/desktop)
- ✅ Tema dark/light mode
- ✅ Acessibilidade avançada (4 controles)
- ✅ Testes com Jest + RTL
- ✅ API service com error handling
- ✅ Performance otimizada
- ✅ SEO friendly (Next.js)
- ✅ Atomic Design pattern
- ✅ Error boundaries
- ✅ Loading states (skeletons)
- ✅ Roteamento dinâmico

---

## 🐛 Tratamento de Erros

O projeto implementa tratamento robusto de erros:

- **ApiError**: Classe customizada para erros de API
- **Error Boundary**: Fallback para erros não capturados
- **Empty State**: Mensagem quando não há artigos
- **Error Page**: Página 404 customizada

---

## � Recursos Adicionais

### 🔍 Checklist de Qualidade
- ✅ TypeScript em 100% do código
- ✅ Componentes React funcionais
- ✅ Context API para state global (2 contextos sincronizados)
- ✅ CSS Modules para estilos isolados
- ✅ Responsivo (mobile/tablet/desktop)
- ✅ Tema dark/light mode
- ✅ Acessibilidade avançada (4 controles)
- ✅ Testes com Jest + RTL (6 testes passando)
- ✅ API service com error handling
- ✅ Performance otimizada (lazy loading, code splitting)
- ✅ SEO friendly (Next.js App Router)
- ✅ Atomic Design pattern (4 níveis)
- ✅ Error boundaries + Error pages
- ✅ Loading states (skeletons)
- ✅ Roteamento dinâmico

---

## 📄 Licença

Este projeto é de código aberto sob a licença MIT.

---

## 👨‍💻 Desenvolvido com ❤️

Desenvolvido como solução para desafio fullstack junior com foco em **acessibilidade**, **performance** e **boas práticas de código**.