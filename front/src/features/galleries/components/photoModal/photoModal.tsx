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
import dayjs from 'dayjs';
import React, { type PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

interface Props extends PropsWithChildren {
  photo: Photo;
}

export const PhotoModal: React.FC<Props> = ({ photo, children }) => {
  const formatedDate = dayjs(photo.createdAt).format('DD.MM.YY HH:mm');
  
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={'rounded-xl p-4 border-none gap-2 max-w-3xl'}>
        <DialogHeader>
          <DialogTitle/>
          <DialogDescription/>
          <Link to={`/users/${photo.author._id}`}>
        <div className={'flex items-center gap-1.5'}>
          <img
            className={'rounded-full size-12 border'}
            src={photo.author.googleId ? photo.author.avatar : `${API_URL}/${photo.author.avatar}`}
            alt={`${photo.author.displayName} avatar`}
          />

          <div className={'flex flex-col relative z-30 w-full'}>
            <div className={'flex gap-1 items-center justify-between w-full'}>
              <span className={'text-sm font-medium leading-none'}>{photo.author.displayName}</span>
              <small className={'text-muted-foreground'}>{formatedDate}</small>
            </div>
            <span className={'text-xs leading-none text-muted-foreground'}>{photo.author.username}</span>
          </div>
        </div>
      </Link>
        </DialogHeader>
        <img
          src={`${API_URL}/${photo.image}`}
          alt={`${photo.title} image`}
          className={'rounded-lg w-full object-cover'}
        />
      </DialogContent>
    </Dialog>
  );
};
