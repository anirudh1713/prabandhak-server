import { Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/async-handler';
import {
  RegisterUserInput,
  LoginUserInput,
  RefreshTokenInput,
} from '../validations/auth.validation';
import { tokenService, userService } from '../services';
import { wrapWithData } from '../utils';
import { TokenPayload } from '../config/tokens';
import prisma from '../prisma';
import { config } from '../config/config';
import ApiError from '../utils/ApiError';

export const registerUser = asyncHandler(
  async (req: Request<{}, {}, RegisterUserInput>, res) => {
    const user = await userService.createUser(req.body);

    const tokens = await tokenService.generateAuthTokens(user.id);

    tokenService.setTokens(res, tokens.access.token, tokens.refresh.token);
    return res.status(201).send(wrapWithData({ user, tokens }));
  },
);

export const loginUser = asyncHandler(
  async (req: Request<{}, {}, LoginUserInput>, res) => {
    const user = await userService.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(400).send({ message: 'Invalid credentials.' });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isValidPassword) {
      return res.status(400).send({ message: 'Invalid credentials.' });
    }

    const tokens = await tokenService.generateAuthTokens(user.id);

    tokenService.setTokens(res, tokens.access.token, tokens.refresh.token);
    return res.status(200).send(wrapWithData({ tokens }));
  },
);

export const refreshToken = asyncHandler(
  async (req: Request<{}, {}, RefreshTokenInput>, res, next) => {
    const payload = jwt.verify(
      req.body.refreshToken,
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
    return res.status(200).send(wrapWithData({ tokens }));
  },
);
