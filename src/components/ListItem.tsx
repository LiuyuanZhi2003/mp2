import React from 'react';
import { ArtItem } from '../types';
import { iiifImage } from '../utils/image';

const ListItem: React.FC<{ item: ArtItem; onClick: () => void }> = ({ item, onClick }) => (
  <li className="list-item" onClick={onClick}>
    <div className="thumb">
      {item.image_id ? (
        <img src={iiifImage(item.image_id, 420)} alt={item.title} loading="lazy" />
      ) : (
        <div className="noimg">No Image</div>
      )}
    </div>
    <div className="meta">
      <div className="title xl">{item.title}</div>
      <div className="sub">{(item.artist_title || 'Unknown artist') + ' • ' + (item.date_display || '—')}</div>
      <div className="tags">
        {item.department_title && <span className="tag">{item.department_title}</span>}
        {item.classification_title && <span className="tag">{item.classification_title}</span>}
      </div>
    </div>
  </li>
);

export default ListItem;