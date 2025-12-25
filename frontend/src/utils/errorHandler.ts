import { ApiError } from '@/services/api';

/**
 * Extrai mensagem de erro de forma consistente
 * @param err - Erro capturado (unknown)
 * @returns Mensagem de erro formatada
 */
export const handleApiError = (err: unknown): string => {
  if (err instanceof ApiError) {
    return err.message || 'Erro na requisição';
  }
  
  if (err instanceof Error) {
    return err.message;
  }
  
  return 'Não foi possível conectar ao servidor';
};
