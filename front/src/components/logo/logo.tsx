import React from 'react';
import logoImg from '/logo.png';

export const Logo: React.FC = () => {
  return (
    <div className={'flex gap-1.5 items-center max-w-max'}>
      <img src={logoImg} alt={'Kana'} className={'size-8'} />
    </div>
  );
};
