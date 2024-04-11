import { User } from "./user.type";

export interface SentFight {
  id: string;
  title: string;
  description: string | null;
  location: string;
  dateTime: Date;
  challengedUser: User;
  author: User;
  createdAt: Date;
}
