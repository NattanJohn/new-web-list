import { render, screen } from '@testing-library/react';
import { PostCard } from './PostCard';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('../../atoms/Title/Title', () => ({
  Title: ({ children, tag: Tag = 'h1' }: { children: React.ReactNode; tag?: 'h1' | 'h2' | 'h3' }) => (
    <Tag>{children}</Tag>
  ),
}));

jest.mock('../../atoms/PostImage/PostImage', () => ({
  PostImage: ({ alt }: { alt: string }) => <img alt={alt} src="test.jpg" />,
}));

const mockArticle = {
  slug: 'test-article',
  title: 'Test Article',
  summary: 'This is a summary.',
  date: '2025-12-24',
  image: 'https://picsum.photos/seed/test/400/200',
};

describe('PostCard', () => {
  it('renders title, summary and date', () => {
    render(<PostCard {...mockArticle} />);
    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('This is a summary.')).toBeInTheDocument();
  });

  it('renders read more link', () => {
    render(<PostCard {...mockArticle} />);
    expect(screen.getByText(/Leia mais/)).toBeInTheDocument();
  });
});
