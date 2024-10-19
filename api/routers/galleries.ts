import express from 'express';
import mongoose, { Types } from 'mongoose';
import { auth, type RequestWithUser } from '../middleware/auth';
import { Gallery } from '../model/Gallery';
import { imagesUpload } from '../multer';

export const galleriesRouter = express.Router();

galleriesRouter.get('/', async (_req, res, next) => {
  try {
    const galleries = await Gallery.find().populate('author', 'displayName avatar username googleId');

    return res.send(galleries);
  } catch (error) {
    return next(error);
  }
});

galleriesRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return { error: 'Unauthorized!' };
    }

    const { title, description } = req.body;

    const gallery = new Gallery({
      author: req.user._id,
      title,
      description,
      image: req.file?.filename,
    });

    await gallery.save();

    return res.send(gallery);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

galleriesRouter.get('/users/:id', async (req: RequestWithUser, res, next) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid ID!' });
    }

    const galleries = await Gallery.find({ author: id }).populate('author', 'displayName avatar username googleId');

    return res.send(galleries);
  } catch (error) {
    return next(error);
  }
});

galleriesRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized!' });
    }

    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid ID!' });
    }

    const query = req.user.role === 'admin' ? { _id: id } : { _id: id, author: req.user._id };
    const gallery = await Gallery.findOne(query);

    if (!gallery) {
      return res.status(404).send({ error: 'Gallery not found!' });
    }

    await gallery.deleteOne();
    res.send({ message: 'Gallery deleted!' });
  } catch (error) {
    next(error);
  }
});
