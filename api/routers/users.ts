import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import { config } from '../config';
import { auth, type RequestWithUser } from '../middleware/auth';
import { usersFieldsValidate } from '../middleware/usersFieldsValidate';
import { User } from '../model/User';
import { imagesUpload } from '../multer';

export const usersRouter = express.Router();
const googleClientId = new OAuth2Client(config.google.clientId);

usersRouter.post('/', usersFieldsValidate, imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    });

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send({ error: 'Username not found!' });
    }

    if (!req.body.password) {
      return res.status(400).send({ error: 'Password is required!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Password is wrong!' });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    return next(error);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await googleClientId.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Google token is invalid!' });
    }

    const email = payload.email;
    const id = payload.sub;
    const displayName = payload.name;

    if (!email || !id || !displayName) {
      return res.status(400).send({ error: 'Not enough user data to continue!' });
    }

    let user = await User.findOne({ googleId: id });

    if (!user) {
      user = new User({
        username: email,
        displayName,
        googleId: id,
        avatar: payload.picture,
        password: randomUUID(),
      });
    }

    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete('/sessions', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized!' });
    }

    req.user.generateToken();
    await req.user.save();

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});
