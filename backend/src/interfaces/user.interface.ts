import { Item } from './item.interface';

export interface User {
  id: number;
  name: string;
  username: string;
  items: Item[];
}
