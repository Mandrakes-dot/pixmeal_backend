import { Request } from 'express';

export type AuthUserPayload = {
  id?: number | string;
  userId?: number | string;
  sub?: number | string;
  email?: string;
};

export type AuthenticatedRequest = Request & {
  user?: AuthUserPayload;
};
