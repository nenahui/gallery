import { Header } from '@/components/header/header';
import React, { type PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation();
  const isNotAuthPage = path.pathname !== '/login' && path.pathname !== '/register';

  return (
    <>
      {isNotAuthPage && <Header />}
      <div className={`${isNotAuthPage && 'container max-w-4xl mx-auto my-4'}`}>{children}</div>
    </>
  );
};
