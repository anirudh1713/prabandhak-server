import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '@prisma/client';
import asyncHandler from '../utils/async-handler';
import {
  TRegisterUserInput,
  TLoginUserInput,
} from '../validations/auth.validation';
import {tokenService, userService} from '../services';
import {TokenPayload, TOKEN_TYPES} from '../config/tokens';
import prisma from '../prisma';
import {config} from '../config/config';
import ApiError from '../utils/ApiError';

export const registerUser = asyncHandler(
  async (req: Request<{}, {}, TRegisterUserInput>, res) => {
    const user = await userService.createUser(req.body);

    const tokens = await tokenService.generateAuthTokens(user.id);

    tokenService.setTokens(res, tokens.access.token, tokens.refresh.token);
    return res.status(201).send({user, tokens});
  },
);

export const loginUser = asyncHandler(
  async (req: Request<{}, {}, TLoginUserInput>, res) => {
    const user = await userService.getUserByEmail(req.body.email);
    if (!user) {
      throw new ApiError(400, 'Invalid credentials.');
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new ApiError(400, 'Invalid credentials.');
    }

    const tokens = await tokenService.generateAuthTokens(user.id);

    tokenService.setTokens(res, tokens.access.token, tokens.refresh.token);
    return res.status(200).send({tokens, user});
  },
);

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = jwt.verify(
      req.cookies[TOKEN_TYPES.REFRESH],
      config.refreshTokenSecret,
    ) as unknown as TokenPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      return next(new ApiError(400, 'Please authenticate.'));
    }

    const tokens = tokenService.generateAuthTokens(user.id);

    tokenService.setTokens(res, tokens.access.token, tokens.refresh.token);
    return res.status(200).send('OK');
  } catch (error) {
    tokenService.clearTokens(res);
    return next(new ApiError(401, 'Please authenticate.'));
  }
};

export const getMe = asyncHandler(
  async (req, res: Response<{user: User}, {user: User}>, next) => {
    const user = await userService.getUserById(res.locals.user.id);
    if (!user) {
      return next(new ApiError(404, 'User not found.'));
    }

    return res.status(200).send({user});
  },
);
