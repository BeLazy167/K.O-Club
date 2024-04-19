import { User } from "./user.type";

export type Fight = {
  id: string;
  title: string;
  description: string | null;
  location: string;
  dateTime: Date;
  authorId: string;
  createdAt: Date;
  challengedId: string;
  challengedAccepted: boolean;
  authorAccepted: boolean;
};

export interface Challenge {
  id: string;
  title: string;
  description: string;
  location: string;
  dateTime: string;
  createdAt: string;
  author: User;
  challenged: User;
}
