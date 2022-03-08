import jwt from 'jsonwebtoken';
import { add, getUnixTime } from 'date-fns';
import { TokenPayload, TOKEN_TYPES } from '../config/tokens';
import { config } from '../config/config';

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
