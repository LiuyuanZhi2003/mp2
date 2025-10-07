export interface ArtItem {
  id: number;
  title: string;
  artist_title?: string | null;
  artist_display?: string | null;
  date_display?: string | null;
  date_start?: number | null;
  date_end?: number | null;
  image_id?: string | null;
  medium_display?: string | null;
  classification_title?: string | null;
  department_title?: string | null;
  style_title?: string | null;
  place_of_origin?: string | null;
}

export interface ApiResponse {
  pagination: { current_page: number; total_pages: number; total: number; limit: number; };
  data: ArtItem[];
}