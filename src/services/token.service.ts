import jwt from 'jsonwebtoken';
import { add, getUnixTime } from 'date-fns';
import { CookieOptions, Response } from 'express';
import { TokenPayload, TOKEN_TYPES } from '../config/tokens';
import { config } from '../config/config';

const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: config.isProduction,
  secure: config.isProduction,
  domain: config.baseDomain,
  path: '/',
};

const accessTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: config.accessTokenLifetimeInMinutes * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: config.refreshTokenLifetimeInDays * 24 * 60 * 60 * 1000,
};

export const generateToken = (
  userId: number,
  expires: Date,
  type: TOKEN_TYPES,
  secret: string,
) => {
  const payload: TokenPayload = {
    sub: userId,
    expires: getUnixTime(expires),
    type,
    iat: getUnixTime(new Date()),
  };

  const token = jwt.sign(payload, secret);

  return token;
};

export const generateAuthTokens = (userId: number) => {
  const accessTokenExpires = add(new Date(), { minutes: config.accessTokenLifetimeInMinutes });
  const accessToken = generateToken(
    userId,
    accessTokenExpires,
    TOKEN_TYPES.ACCESS,
    config.accessTokenSecret,
  );

  const refreshTokenExpires = add(new Date(), { days: config.refreshTokenLifetimeInDays });
  const refreshToken = generateToken(
    userId,
    refreshTokenExpires,
    TOKEN_TYPES.REFRESH,
    config.refreshTokenSecret,
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires,
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires,
    },
  };
};

export const setTokens = (res: Response, access: string, refresh?: string) => {
  res.cookie(TOKEN_TYPES.ACCESS, access, accessTokenCookieOptions);
  if (refresh) res.cookie(TOKEN_TYPES.REFRESH, refresh, refreshTokenCookieOptions);
};

export const clearTokens = (res: Response) => {
  res.cookie(TOKEN_TYPES.ACCESS, '', { ...accessTokenCookieOptions, maxAge: 0 });
  res.cookie(TOKEN_TYPES.REFRESH, '', { ...refreshTokenCookieOptions, maxAge: 0 });
};
