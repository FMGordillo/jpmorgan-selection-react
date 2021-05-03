export interface Category {
  id: number;
  name: string;
}

export interface Event {
  categoryId: number; // related to Category
  name: string;
  description: string;
  location: string;
  date: Date | string; // TODO: Not sure
}
