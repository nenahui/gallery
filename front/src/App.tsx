import { Layout } from '@/components/layout/layout';
import { NotFound } from '@/components/notFound/notFound';
import { Galleries } from '@/features/galleries/galleries';
import { UserGalleries } from '@/features/galleries/userGalleries';
import { Login } from '@/features/users/login';
import { Register } from '@/features/users/register';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<Galleries />} />
        <Route path={'/users/:id'} element={<UserGalleries />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </Layout>
  );
};
