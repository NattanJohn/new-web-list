import { getApiUrl } from '@/lib/getApiUrl';
import type { Article, ArticleList, ApiErrorShape, ArticlePageResponse } from '@/types';

const API_URL = getApiUrl();

export class ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;

  constructor(shape: ApiErrorShape) {
    super(shape.message);
    this.name = 'ApiError';
    this.status = shape.status;
    this.code = shape.code;
    this.details = shape.details;
  }
}

async function fetchWithTimeout(input: RequestInfo, init?: RequestInit, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(input, { signal: controller.signal, ...init });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw new ApiError({ 
      message: (err instanceof Error && err.message) ? err.message : 'Network error',
      status: 0 
    });
  }
}

async function handleResponse<T = unknown>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type') || '';
  const tryParseJson = contentType.includes('application/json');
  let body: unknown = null;

  if (tryParseJson) {
    try { body = await res.json(); } catch { body = null; }
  } else {
    try { body = await res.text(); } catch { body = null; }
  }

  if (res.ok) return body as T;

  const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object';

  const getMessageFromBody = (b: unknown): string | undefined => {
    if (!b) return undefined;
    if (typeof b === 'string') return b;
    if (isObject(b)) {
      const maybeMessage = b['message'] ?? b['error'];
      if (typeof maybeMessage === 'string') return maybeMessage;
      if (isObject(maybeMessage) && typeof maybeMessage['message'] === 'string') return String(maybeMessage['message']);
    }
    return undefined;
  };

  const message = getMessageFromBody(body) ?? res.statusText ?? 'Erro na requisição';
  throw new ApiError({ message, status: res.status, details: body });
}

export const api = {
  async getArticles(): Promise<ArticleList> {
    const res = await fetchWithTimeout(`${API_URL}/articles`, { cache: 'no-store' });
    return handleResponse<ArticleList>(res);
  },

  async getArticlesPaginated(page: number, perPage: number): Promise<ArticlePageResponse> {
    // Usamos o construtor URL para garantir que os parâmetros fiquem corretos
    const url = new URL(`${API_URL}/articles`);
    url.searchParams.set('page', String(page));
    url.searchParams.set('per_page', String(perPage));
    
    const res = await fetchWithTimeout(url.toString(), { cache: 'no-store' });
    return handleResponse<ArticlePageResponse>(res);
  },

  async getArticleBySlug(slug: string): Promise<Article | null> {
    const res = await fetchWithTimeout(`${API_URL}/articles/${encodeURIComponent(slug)}`, { cache: 'no-store' });
    if (res.status === 404) return null;
    return handleResponse<Article>(res);
  }
};