import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import { config } from './config';
import { Gallery } from './model/Gallery';
import { User } from './model/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('galleries');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [kanat, argen, sanya] = await User.create(
    {
      username: 'kanat',
      displayName: 'Sydykov Kanat',
      password: '123qwe',
      role: 'admin',
      avatar: '/fixtures/a1.jpg',
      token: randomUUID(),
    },
    {
      username: 'Argen',
      displayName: 'Ashimov Argen',
      password: '123qwe',
      avatar: '/fixtures/a2.jpg',
      token: randomUUID(),
    },
    {
      username: 'sanya',
      displayName: 'Mokeichuk Sanya',
      password: '123qwe',
      avatar: '/fixtures/a3.jpg',
      token: randomUUID(),
    }
  );

  await Gallery.create(
    {
      author: kanat._id,
      title: 'Black and White',
      description: 'Beautiful nature',
      image: '/fixtures/1.jpg',
    },
    {
      author: kanat._id,
      title: 'Presidents',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.',
      image: '/fixtures/2.jpg',
    },
    {
      author: kanat._id,
      title: 'Polices',
      description: 'Police officers in action in the city center',
      image: '/fixtures/3.jpg',
    },
    {
      author: argen._id,
      title: 'Magic skate',
      description: 'Skateboarder in the air with a beautiful monster',
      image: '/fixtures/4.jpg',
    },
    {
      author: argen._id,
      title: 'Children are playing around',
      description: 'Children are playing around with each other at school',
      image: '/fixtures/5.jpg',
    },
    {
      author: sanya._id,
      title: 'Spider Man',
      description: 'Funny spider man walks around the city',
      image: '/fixtures/6.jpg',
    },
    {
      author: sanya._id,
      title: 'The fool is fooling around',
      description: 'TA fool is fooling around in the city center with a STOP sign',
      image: '/fixtures/7.jpg',
    }
  );

  await db.close();
};

run().catch(console.error);
