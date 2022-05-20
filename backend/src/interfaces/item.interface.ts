import { User } from './user.interface';

export interface Item {
  id: number;
  title: string;
  createdAt: Date;
  user: User;
}
