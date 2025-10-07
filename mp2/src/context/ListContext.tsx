import React, { useEffect, useMemo, useState } from 'react';

interface Ctx {
  ids: number[];
  setIds: (ids: number[]) => void;
  indexById: Map<number, number>;
}

export const ListContext = React.createContext<Ctx>({ ids: [], setIds: () => {}, indexById: new Map() });

export const ListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ids, setIds] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem('aic_ids') || '[]'); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem('aic_ids', JSON.stringify(ids)); }, [ids]);
  const indexById = useMemo(() => { const m = new Map<number, number>(); ids.forEach((id, i)=>m.set(id,i)); return m; }, [ids]);
  return <ListContext.Provider value={{ ids, setIds, indexById }}>{children}</ListContext.Provider>;
};