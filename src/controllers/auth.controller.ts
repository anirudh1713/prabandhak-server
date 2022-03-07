import { Request } from 'express';
import bcrypt from 'bcrypt';
import asyncHandler from '../utils/async-handler';
import { RegisterUserInput, LoginUserInput } from '../validations/auth.validation';
import { tokenService, userService } from '../services';
import { wrapWithData } from '../utils';

export const registerUser = asyncHandler(
  async (req: Request<{}, {}, RegisterUserInput>, res) => {
    const user = await userService.createUser(req.body);

    return res.status(201).send(wrapWithData({ user }));
  },
);

export const loginUser = asyncHandler(
  async (req: Request<{}, {}, LoginUserInput>, res) => {
    const user = await userService.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(400).send({ message: 'Invalid credentials.' });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({ message: 'Invalid credentials.' });
    }

    const tokens = await tokenService.generateAuthTokens(user.id);

    return res.status(200).send(wrapWithData({ tokens }));
  },
);
