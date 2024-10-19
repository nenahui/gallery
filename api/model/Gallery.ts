import mongoose, { Types } from 'mongoose';
import { User } from './User';

const Schema = mongoose.Schema;

const GallerySchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,

    validate: {
      validator: async function (value: Types.ObjectId): Promise<boolean> {
        const user = await User.findOne({ _id: value });
        return !!user;
      },
      message: 'This user does not exist!',
    },
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Gallery = mongoose.model('Gallery', GallerySchema);
