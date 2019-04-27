export interface MondayResponse {
  data: BoardRow[];
}
export interface BoardRow {
  pulse: {
    url: string;
    id: number;
    name: string;
    updates_count: number;
    board_id: number;
    created_at: string;
    updated_at: string;
  };
  board_meta: {
    position: number;
    group_id: string;
  };
  column_values: Column[];
}

export interface Column {
  cid: string;
  title: string;
  name?: string;
  value?:
    | Person
    | Location
    | TagList
    | string
    | null
    | Phone
    | Email
    | GenericValue;
}

export interface Person {
  id: number;
  name: string;
  photo_url: string;
  url: string;
  disabled: boolean;
  is_guest: boolean;
  is_view_only: boolean;
  title: string;
}
export interface Location {
  address: string;
  lat: number;
  lng: number;
  placeId: string;
  changed_at: string;
}
export interface TagList {
  tag_ids: number[];
}
interface GenericValue {
  index: 3;
  changed_at: string;
  update_id: null;
}
export interface Phone {
  phone: string;
  countryShortName: string;
  changed_at: string;
}
export interface Email {
  email: string;
  text: string;
  changed_at: string;
}
