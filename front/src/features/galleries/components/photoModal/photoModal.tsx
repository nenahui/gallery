import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { API_URL } from '@/consts';
import type { Photo } from '@/types';
import React, { type PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  photo: Photo;
}

export const PhotoModal: React.FC<Props> = ({ photo, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={'rounded-xl border-none gap-2 max-w-3xl'}>
        <DialogHeader>
          <DialogTitle>{photo.title}</DialogTitle>
          <DialogDescription>{photo.description}</DialogDescription>
        </DialogHeader>
        <img src={`${API_URL}/${photo.image}`} alt={`${photo.title} image`} className={'rounded-lg'} />
      </DialogContent>
    </Dialog>
  );
};
