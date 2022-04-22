/* eslint-disable consistent-return */
import {Strategy, StrategyOptions, VerifyCallback} from 'passport-jwt';
import prisma from '../prisma';
import {config} from './config';
import {TokenPayload, TOKEN_TYPES} from './tokens';

const options: StrategyOptions = {
  secretOrKey: config.accessTokenSecret,
  jwtFromRequest: req => {
    const token = req.cookies[TOKEN_TYPES.ACCESS];

    return token || null;
  },
};

const jwtVerify: VerifyCallback = async (payload: TokenPayload, done) => {
  try {
    if (payload.type !== TOKEN_TYPES.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await prisma.user.findUnique({where: {id: payload.sub}});
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new Strategy(options, jwtVerify);
