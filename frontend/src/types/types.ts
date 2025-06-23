export enum Priority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

export enum Status {
  TODO = 1,
  IN_PROGRESS = 2,
  DONE = 3,
}

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  deletedAt: Date | null;
  deadline: Date | null;
  priority: Priority;
  userId: string;
};