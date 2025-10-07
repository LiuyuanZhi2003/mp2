import axios from 'axios';

export const api = axios.create({ baseURL: 'https://api.artic.edu' });

export const FIELDS = [
  'id','title','artist_display','artist_title','date_display','date_start','date_end',
  'image_id','medium_display','classification_title','department_title','style_title','place_of_origin'
].join(',');

const cache = new Map<string, any>();
export async function getCached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (cache.has(key)) return cache.get(key);
  const v = await fn();
  cache.set(key, v);
  return v;
}