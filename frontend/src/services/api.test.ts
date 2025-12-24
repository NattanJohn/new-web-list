import { api } from './api';

// Mock global fetch
global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should have getArticles method', () => {
    expect(api.getArticles).toBeDefined();
  });

  it('should have getArticleBySlug method', () => {
    expect(api.getArticleBySlug).toBeDefined();
  });
});
