import { User } from "./user.type";

export interface RecievedFight {
  id: string;
  title: string;
  description: string | null;
  location: string;
  dateTime: Date;
  authorId: string;
  authorAccepted: boolean;
  createdAt: Date;
  challengedId: string;
  challengedAccepted: boolean;
  author: User;
}
