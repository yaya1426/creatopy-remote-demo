import { Item } from './item.interface';

export interface User {
  name: string;
  username: string;
  items: Item[];
}
