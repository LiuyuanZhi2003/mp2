import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, FIELDS, getCached } from '../api/aic';
import { ArtItem, ApiResponse } from '../types';
import { ListContext } from '../context/ListContext';
import FilterChips from '../components/FilterChips';
import GalleryCard from '../components/GalleryCard';

const GalleryView: React.FC = () => {
  const { setIds } = React.useContext(ListContext);
  const [items, setItems] = useState<ArtItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true); setError(null);
      try {
        const url = `/api/v1/artworks`;
        const key = `${url}?fields=${FIELDS}&limit=100&has_image=1`;
        const res = await getCached<ApiResponse>(key, async () => {
          const r = await api.get<ApiResponse>(url, { params: { fields: FIELDS, limit: 100, has_image: 1 } });
          return r.data as any;
        });
        setItems(res.data || []);
      } catch {
        setError('Failed to load gallery items.');
      } finally { setLoading(false); }
    })();
  }, []);

  const depts = useMemo(() => Array.from(new Set(items.map(i=>i.department_title).filter(Boolean))) as string[], [items]);
  const classes = useMemo(() => Array.from(new Set(items.map(i=>i.classification_title).filter(Boolean))) as string[], [items]);

  const toggle = (arr: string[], v: string, setter: (v: string[]) => void) => {
    setter(arr.includes(v) ? arr.filter(x=>x!==v) : [...arr, v]);
  };

  const filtered = useMemo(() => {
    return items.filter(i => {
      const deptOk = selectedDepartments.length===0 || selectedDepartments.includes(i.department_title || '');
      const classOk = selectedClasses.length===0 || selectedClasses.includes(i.classification_title || '');
      return deptOk && classOk;
    });
  }, [items, selectedDepartments, selectedClasses]);

  const navigate = useNavigate();
  const onOpenDetail = (id: number) => { setIds(filtered.map(x=>x.id)); navigate(`/detail/${id}`); };

  return (
    <div className="page container">
      <h1 className="center-text m0">Collection Gallery</h1>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      <div className="filters">
        <FilterChips title="Department" options={depts} selected={selectedDepartments} onToggle={(v)=>toggle(selectedDepartments,v,setSelectedDepartments)} defaultOpen />
        <FilterChips title="Classification" options={classes} selected={selectedClasses} onToggle={(v)=>toggle(selectedClasses,v,setSelectedClasses)} />
      </div>

      <div className="grid">
        {filtered.map((it) => (
          <GalleryCard key={it.id} item={it} onClick={() => onOpenDetail(it.id)} />
        ))}
      </div>
    </div>
  );
};

export default GalleryView;