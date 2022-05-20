import { User } from './user.interface';

export interface Item {
  title: string;
  created_at: Date;
  user: User;
}
