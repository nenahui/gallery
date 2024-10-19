import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <small className={'text-muted-foreground absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4'}>
      404 Page not found |
      <Link to={'/'} className={'text-black underline ml-1'}>
        Back to home
      </Link>
    </small>
  );
};
