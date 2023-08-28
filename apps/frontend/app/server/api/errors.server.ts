export interface ApiErrorMessage {
  errors: {
    [key: string]: string | string[] | undefined;
    base?: string[];
  };
}

export class ApiError extends Error {
  status: number;
  backendError: ApiErrorMessage | undefined;

  constructor(message: string, status: number, backendError?: ApiErrorMessage | undefined) {
    super();
    this.message = message;
    this.status = status;
    this.backendError = backendError;
    this.name = 'APIError';
  }
}
