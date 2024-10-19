import { Card } from '@/components/ui/card';
import { API_URL } from '@/consts';
import type { Photo } from '@/types';
import React from 'react';

interface Props {
  photo: Photo;
}

export const PhotoCard: React.FC<Props> = ({ photo }) => {
  return (
    <Card className={'shadow-none space-y-1'}>
      <div className={'pt-2 px-2'}>
        <img className={'rounded-lg'} src={`${API_URL}/${photo.image}`} alt={`${photo.title} image`} />
      </div>

      <h4 className={'font-medium pl-3'}>{photo.title}</h4>

      <div className={'flex items-center gap-1.5 border-t p-2 pt-1.5'}>
        <img
          className={'rounded-full size-8 border'}
          src={`${API_URL}/${photo.author.avatar}`}
          alt={`${photo.author.displayName} avatar`}
        />

        <div className={'flex flex-col'}>
          <span className={'text-sm font-medium leading-none'}>{photo.author.displayName}</span>
          <span className={'text-sm leading-none text-muted-foreground'}>@{photo.author.username}</span>
        </div>
      </div>
    </Card>
  );
};
