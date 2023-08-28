import { ForbiddenErrorHead, ForbiddenErrorView } from './forbidden.view';
import { NotFoundHead, NotFoundView } from './not-found.view';
import { ServerErrorHead, ServerErrorView } from './server-error.view';
import { UnauthorizedErrorHead, UnauthorizedErrorView } from './unauthorized.view';

export const ErrorViews = {
  401: UnauthorizedErrorView,
  403: ForbiddenErrorView,
  404: NotFoundView,
  500: ServerErrorView,
  DEFAULT: ServerErrorView,
};

export const ErrorHeads = {
  401: UnauthorizedErrorHead,
  403: ForbiddenErrorHead,
  404: NotFoundHead,
  500: ServerErrorHead,
  DEFAULT: ServerErrorHead,
};
