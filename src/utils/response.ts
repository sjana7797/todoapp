export function globalResponseCreator<T>(
  data: T,
  message: string,
  status: number,
  error?: any
): GlobalResponse<T> {
  return {
    data,
    message,
    status,
    error,
  };
}

export interface GlobalResponse<T> {
  data: T;
  message: string;
  status: number;
  error?: any;
}
