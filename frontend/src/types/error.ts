export type ApiErrorShape = {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
};

export type ApiResponse<T = unknown> = {
  data?: T;
  error?: ApiErrorShape | null;
};

export default ApiErrorShape;
