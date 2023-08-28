export class UnauthenticatedError extends Error {
  constructor(redirectTo: string) {
    super();
    this.message = redirectTo;
    this.name = 'UnauthenticatedError';
  }
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
    this.name = 'APIError';
  }
}
