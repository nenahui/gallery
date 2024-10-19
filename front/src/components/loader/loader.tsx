import { Loader as LucideLoader, type LucideProps } from 'lucide-react';
import React from 'react';

interface Props extends LucideProps {
  absolute?: boolean;
  fixed?: boolean;
}

export const Loader: React.FC<Props> = ({ absolute, fixed, ...iconProps }) => {
  return (
    <div
      className={`${absolute && 'absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4'} ${fixed && 'fixed top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4'}`}
    >
      <LucideLoader
        {...iconProps}
        className={`animate-spin text-muted-foreground size-5 duration-1000 ${iconProps.className}`}
      />
    </div>
  );
};
