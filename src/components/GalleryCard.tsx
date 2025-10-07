import React from 'react';
import { ArtItem } from '../types';
import { iiifImage } from '../utils/image';

const GalleryCard: React.FC<{ item: ArtItem; onClick: () => void }> = ({ item, onClick }) => (
  <figure className="card" onClick={onClick}>
    {item.image_id ? (
      <img src={iiifImage(item.image_id, 600)} alt={item.title} loading="lazy" />
    ) : (
      <div className="noimg large">No Image</div>
    )}
    <figcaption>
      <div className="card-title">{item.title}</div>
      <div className="card-sub">{item.artist_title || 'Unknown'} • {item.date_display || '—'}</div>
    </figcaption>
  </figure>
);

export default GalleryCard;