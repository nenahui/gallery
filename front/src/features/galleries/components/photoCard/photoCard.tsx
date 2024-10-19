import { Card } from '@/components/ui/card';
import { API_URL } from '@/consts';
import type { Photo } from '@/types';
import React from 'react';

interface Props {
  photo: Photo;
}

export const PhotoCard: React.FC<Props> = ({ photo }) => {
  return (
    <Card className={'shadow-none space-y-2 dark bg-zinc-800 p-3'}>
      <div className={'flex items-center gap-1.5'}>
        <img
          className={'rounded-full size-12 border'}
          src={photo.author.googleId ? photo.author.avatar : `${API_URL}/${photo.author.avatar}`}
          alt={`${photo.author.displayName} avatar`}
        />

        <div className={'flex flex-col relative z-30'}>
          <span className={'text-sm font-medium leading-none'}>{photo.author.displayName}</span>
          <span className={'text-xs leading-none text-muted-foreground'}>{photo.author.username}</span>
        </div>
      </div>

      <div className={'relative z-30'}>
        <h4 className={'font-medium leading-none'}>{photo.title}</h4>
        <p className={'text-xs text-muted-foreground line-clamp-2'}>{photo.description}</p>
      </div>

      <div className={'relative'}>
        <img
          className={'rounded-lg relative z-20 h-80 object-cover'}
          src={`${API_URL}/${photo.image}`}
          alt={`${photo.title} image`}
        />
        <img
          className={'rounded-lg absolute top-0 z-10 backdrop-blur-xl h- blur-2xl h-full object-cover'}
          src={`${API_URL}/${photo.image}`}
          alt={`${photo.title} image`}
        />
      </div>
    </Card>
  );
};
