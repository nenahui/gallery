import type { Model } from 'mongoose';

export interface UserFields {
  username: string;
  displayName: string;
  avatar: string | null;
  password: string;
  token: string;
  role: 'user' | 'admin';
  googleId?: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;
