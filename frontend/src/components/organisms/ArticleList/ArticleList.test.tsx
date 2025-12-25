import { render, screen, waitFor } from '@testing-library/react';

const mockArticles = [
  {
    slug: 'test-1',
    title: 'First Article',
    summary: 'Summary 1',
    date: '2025-12-24',
    image: 'https://picsum.photos/seed/1/400/200',
  },
  {
    slug: 'test-2',
    title: 'Second Article',
    summary: 'Summary 2',
    date: '2025-12-23',
    image: 'https://picsum.photos/seed/2/400/200',
  },
];

// Mock window.scrollTo before component tests
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});

// Mock the API module before importing ArticleList
jest.mock('@/services/api', () => ({
  api: {
    getArticles: jest.fn().mockResolvedValue(mockArticles),
  },
  ApiError: class ApiError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ApiError';
    }
  },
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('../../molecules/PostCard/PostCard', () => ({
  PostCard: ({ title, summary }: { title?: string; summary?: string }) => (
    <div data-testid="post-card">
      <h2>{title ?? 'Untitled'}</h2>
      <p>{summary ?? ''}</p>
    </div>
  ),
}));

jest.mock('../../atoms/Pagination/Pagination', () => ({
  Pagination: () => <div data-testid="pagination">Pagination</div>,
}));

jest.mock('../../atoms/Skeleton/SkeletonList', () => ({
  SkeletonList: () => <div data-testid="skeleton-list">Loading...</div>,
}));

// Import after mocks
import { ArticleList } from './ArticleList';

describe('ArticleList', () => {
  it('renders articles after loading', async () => {
    render(<ArticleList />);

    await waitFor(() => {
      const postCards = screen.getAllByTestId('post-card');
      expect(postCards).toHaveLength(2);
    });
  });

  it('renders pagination component', async () => {
    render(<ArticleList />);

    await waitFor(() => {
      const pagination = screen.getByTestId('pagination');
      expect(pagination).toBeInTheDocument();
    });
  });
});
