export type Fight = {
  id: string;
  title: string;
  description: string | null;
  location: string;
  dateTime: Date;
  authorId: string;
  createdAt: Date;
  challengedId: string;
};
