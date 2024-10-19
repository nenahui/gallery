export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  avatar: string;
  token: string;
  role: 'admin' | 'user';
  googleId?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Author {
  _id: string;
  username: string;
  displayName: string;
  avatar: string;
  googleId?: string;
  role: 'admin' | 'user';
}

export interface Photo {
  _id: string;
  author: Author;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

export interface PhotoMutation {
  title: string;
  description: string;
  image: File | null;
}
