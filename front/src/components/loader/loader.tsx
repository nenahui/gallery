import { Loader as LucideLoader, type LucideProps } from 'lucide-react';
import React from 'react';

interface Props extends LucideProps {
  absoluteCenter?: boolean;
}

export const Loader: React.FC<Props> = ({ absoluteCenter, ...iconProps }) => {
  return (
    <div className={`${absoluteCenter && 'absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4'}`}>
      <LucideLoader {...iconProps} className={`animate-spin duration-1000 ${iconProps.className}`} />
    </div>
  );
};
