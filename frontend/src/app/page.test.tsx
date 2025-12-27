import { render, screen, waitFor } from '@testing-library/react';
import HomePage from './page';
import { api } from '@/services/api';

// Mock das dependências
jest.mock('@/services/api', () => ({
  api: {
    getArticles: jest.fn(),
    getArticlesPaginated: jest.fn(),
  },
  ApiError: class MockApiError extends Error {
    status?: number;
    code?: string;
    details?: unknown;
    constructor(shape: { message: string; status?: number; code?: string; details?: unknown }) {
      super(shape.message);
      this.name = 'ApiError';
      this.status = shape.status;
      this.code = shape.code;
      this.details = shape.details;
    }
  },
}));

jest.mock('@/context/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({ theme: 'light', setTheme: jest.fn(), toggleTheme: jest.fn() }),
}));

jest.mock('@/context/AccessibilityContext', () => ({
  AccessibilityProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAccessibility: () => ({
    fontSize: 1,
    lineHeight: 'normal',
    highContrast: false,
    grayscale: false,
    updateConfig: jest.fn(),
    resetConfig: jest.fn(),
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(() => null),
    toString: jest.fn(() => ''),
  }),
  usePathname: () => '/',
}));

const mockArticles = [
  {
    slug: 'primeiro-artigo',
    title: 'Primeiro Artigo de Teste',
    summary: 'Este é o resumo do primeiro artigo',
    date: '2025-12-24',
    image: 'https://picsum.photos/seed/1/800/450',
  },
  {
    slug: 'segundo-artigo',
    title: 'Segundo Artigo de Teste',
    summary: 'Este é o resumo do segundo artigo',
    date: '2025-12-23',
    image: 'https://picsum.photos/seed/2/800/450',
  },
  {
    slug: 'terceiro-artigo',
    title: 'Terceiro Artigo de Teste',
    summary: 'Este é o resumo do terceiro artigo',
    date: '2025-12-22',
    image: 'https://picsum.photos/seed/3/800/450',
  },
];

describe('HomePage - Integration Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mock para getArticlesPaginated
    (api.getArticlesPaginated as jest.Mock).mockResolvedValue({
      data: mockArticles,
      meta: {
        total: mockArticles.length,
        page: 1,
        perPage: 6,
        totalPages: 1,
      },
    });
  });

  it('should render home page with articles list', async () => {
    const component = await HomePage();
    render(component);

    // Verificar se os artigos são renderizados
    await waitFor(() => {
      expect(screen.getByText('Primeiro Artigo de Teste')).toBeInTheDocument();
      expect(screen.getByText('Segundo Artigo de Teste')).toBeInTheDocument();
      expect(screen.getByText('Terceiro Artigo de Teste')).toBeInTheDocument();
    });

    // Verificar resumos
    expect(screen.getByText('Este é o resumo do primeiro artigo')).toBeInTheDocument();
    expect(screen.getByText('Este é o resumo do segundo artigo')).toBeInTheDocument();
  });

  it('should render with HomeTemplate structure', async () => {
    const component = await HomePage();
    const { container } = render(component);

    // Verificar estrutura básica do template
    await waitFor(() => {
      expect(container.querySelector('main')).toBeInTheDocument();
    });
  });

  it('should handle empty articles list', async () => {
    (api.getArticlesPaginated as jest.Mock).mockResolvedValue({
      data: [],
      meta: { total: 0, page: 1, perPage: 6, totalPages: 0 },
    });

    const component = await HomePage();
    render(component);

    await waitFor(() => {
      // Deve renderizar estado vazio
      expect(screen.queryByText('Primeiro Artigo de Teste')).not.toBeInTheDocument();
    });
  });

  it('should handle API error gracefully', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    (api.getArticlesPaginated as jest.Mock).mockRejectedValue(new Error('API Error'));

    const component = await HomePage();
    render(component);

    // Verificar que o erro foi tratado
    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        'Erro ao carregar artigos no servidor:',
        expect.any(Error)
      );
    });

    consoleError.mockRestore();
  });

  it('should render correct number of articles', async () => {
    const manyArticles = Array.from({ length: 10 }, (_, i) => ({
      slug: `artigo-${i}`,
      title: `Artigo ${i}`,
      summary: `Resumo do artigo ${i}`,
      date: '2025-12-24',
      image: `https://picsum.photos/seed/${i}/800/450`,
    }));

    (api.getArticlesPaginated as jest.Mock).mockResolvedValue({
      data: manyArticles.slice(0, 6),
      meta: { total: 10, page: 1, perPage: 6, totalPages: 2 },
    });

    const component = await HomePage();
    render(component);

    await waitFor(() => {
      // A paginação deve mostrar apenas 6 artigos por página
      expect(screen.getByText('Artigo 0')).toBeInTheDocument();
      expect(screen.getByText('Artigo 5')).toBeInTheDocument();
      // O sétimo não deve estar visível na primeira página
      expect(screen.queryByText('Artigo 6')).not.toBeInTheDocument();
    });
  });

  it('should have proper semantic HTML structure', async () => {
    const component = await HomePage();
    const { container } = render(component);

    await waitFor(() => {
      // Verificar elementos semânticos
      expect(container.querySelector('main')).toBeInTheDocument();
      expect(screen.getByText('Primeiro Artigo de Teste')).toBeInTheDocument();
    });

    // Verificar que os artigos têm estrutura de article
    const articles = container.querySelectorAll('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  it('should render articles with correct dates', async () => {
    const component = await HomePage();
    const { container } = render(component);

    await waitFor(() => {
      // Verificar que as datas estão formatadas e presentes
      const timeElements = container.querySelectorAll('time');
      expect(timeElements.length).toBeGreaterThan(0);
    });
  });
});
