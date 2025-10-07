import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, FIELDS, getCached } from '../api/aic';
import { ArtItem } from '../types';
import { ListContext } from '../context/ListContext';
import { iiifImage } from '../utils/image';

const ChevronLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor"/>
  </svg>
);

const DetailView: React.FC = () => {
  const { ids, indexById } = React.useContext(ListContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<ArtItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const url = `/api/v1/artworks/${id}`;
        const key = `${url}?fields=${FIELDS}`;
        const res = await getCached<any>(key, async () => {
          const r = await api.get(url, { params: { fields: FIELDS } });
          return r.data;
        });
        setItem(res.data as ArtItem);
      } catch {
        setError('Failed to load detail.');
      }
    })();
  }, [id]);

  const idx = item ? indexById.get(item.id) ?? -1 : -1;
  const hasPrev = idx > 0;
  const hasNext = idx >= 0 && idx < ids.length - 1;

  const goPrev = () => { if (!hasPrev) return; navigate(`/detail/${ids[idx-1]}`); };
  const goNext = () => { if (!hasNext) return; navigate(`/detail/${ids[idx+1]}`); };

  return (
    <div className="page container">
      {!item && !error && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      {item && (
        <div className="detail-stage">
          <button className="sidebtn left" onClick={goPrev} disabled={!hasPrev} aria-label="Previous artwork" title="Previous">
            <ChevronLeftIcon />
          </button>
          <button className="sidebtn right" onClick={goNext} disabled={!hasNext} aria-label="Next artwork" title="Next">
            <ChevronRightIcon />
          </button>

          <article className="detail">
            <div className="detail-media">
              {item.image_id ? (
                <img src={iiifImage(item.image_id, 900)} alt={item.title} />
              ) : (
                <div className="noimg huge">No Image</div>
              )}
            </div>
            <div className="detail-content">
              <h1>{item.title}</h1>
              <p className="muted">{item.artist_display || item.artist_title || 'Unknown artist'}</p>
              <p>{item.date_display || '—'}</p>
              <dl className="defs">
                {item.medium_display && (<><dt>Medium</dt><dd>{item.medium_display}</dd></>)}
                {item.classification_title && (<><dt>Classification</dt><dd>{item.classification_title}</dd></>)}
                {item.department_title && (<><dt>Department</dt><dd>{item.department_title}</dd></>)}
                {item.style_title && (<><dt>Style</dt><dd>{item.style_title}</dd></>)}
                {item.place_of_origin && (<><dt>Origin</dt><dd>{item.place_of_origin}</dd></>)}
              </dl>

              <div className="detail-links">
                <a className="external" href={`https://www.artic.edu/artworks/${item.id}`} target="_blank" rel="noreferrer">View on artic.edu ↗</a>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default DetailView;