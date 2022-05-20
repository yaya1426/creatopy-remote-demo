import { User } from "./user";

export interface Item {
  id: string;
  title: string;
  createdAt: Date;
  user: User;
}
