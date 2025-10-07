import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, FIELDS, getCached } from '../api/aic';
import { ArtItem, ApiResponse } from '../types';
import { ListContext } from '../context/ListContext';
import SearchBar from '../components/SearchBar';
import SortControls from '../components/SortControls';

const DEBOUNCE_MS = 300;
const PAGE_LIMIT = 100;

const ListView: React.FC = () => {
  const { setIds } = React.useContext(ListContext);
  const [typed, setTyped] = useState('');
  const [items, setItems] = useState<ArtItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<'title' | 'date_start'>('title');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const fetchOnce = async (q: string) => {
    if (!q.trim()) { setItems([]); return; }
    setLoading(true); setError(null);
    try {
      const url = `/api/v1/artworks/search`;
      const key = `${url}?q=${encodeURIComponent(q)}&page=1&fields=${FIELDS}&limit=${PAGE_LIMIT}`;
      const res = await getCached<ApiResponse>(key, async () => {
        const r = await api.get<ApiResponse>(url, { params: { q, page: 1, fields: FIELDS, limit: PAGE_LIMIT } });
        return r.data as any;
      });
      setItems(res.data || []);
    } catch (e) { setError('Failed to load from AIC API.'); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    const t = setTimeout(() => { fetchOnce(typed); }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [typed]);

  const sorted = useMemo(() => {
    const arr = [...items];
    return arr.sort((a,b) => {
      const av = (sortKey === 'title') ? (a.title || '').toLowerCase() : (a.date_start ?? 0);
      const bv = (sortKey === 'title') ? (b.title || '').toLowerCase() : (b.date_start ?? 0);
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [items, sortKey, sortDir]);

  const navigate = useNavigate();
  const onOpenDetail = (id: number) => { setIds(sorted.map(x=>x.id)); navigate(`/detail/${id}`); };

  const hasQuery = typed.trim().length > 0;

  return (
    <div className="page container">
      <h1 className="center-text m0">Collection Search</h1>
      <div className="controls-row">
        <div className="header-input"><SearchBar value={typed} onChange={setTyped} /></div>
        <SortControls sortKey={sortKey} sortDir={sortDir} onKey={setSortKey} onToggleDir={() => setSortDir(d=>d==='asc'?'desc':'asc')} />
      </div>

      {hasQuery && loading && <p>Loading…</p>}
      {hasQuery && error && <p className="error">{error}</p>}
      {hasQuery && !loading && !error && sorted.length === 0 && (<p>No results.</p>)}

      {hasQuery && sorted.length > 0 && (
        <ul className="list">
          {sorted.map((it) => (
            <li key={it.id} className="list-item" onClick={() => onOpenDetail(it.id)}>
              <div className="thumb">
                {it.image_id ? (
                  <img src={`https://www.artic.edu/iiif/2/${it.image_id}/full/200,/0/default.jpg`} alt={it.title} loading="lazy" />
                ) : (
                  <div className="noimg">No Image</div>
                )}
              </div>
              <div className="meta">
                <div className="title">{it.title}</div>
                <div className="sub">{(it.artist_title || 'Unknown artist') + ' • ' + (it.date_display || '—')}</div>
                <div className="tags">
                  {it.department_title && <span className="tag">{it.department_title}</span>}
                  {it.classification_title && <span className="tag">{it.classification_title}</span>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListView;