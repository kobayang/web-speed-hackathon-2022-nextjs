export class BadRequestError extends Error {}
export class PreconditionFailedError extends Error {}
export class NotFoundError extends Error {}
export class UnauthorizedError extends Error {}
export class ForbiddenError extends Error {}

export function handleErrorToStatusCode(error) {
  if (error instanceof BadRequestError) {
    return 400;
  }
  if (error instanceof PreconditionFailedError) {
    return 412;
  }
  if (error instanceof NotFoundError) {
    return 404;
  }
  if (error instanceof UnauthorizedError) {
    return 401;
  }
  if (error instanceof ForbiddenError) {
    return 403;
  }
  return 500;
}
