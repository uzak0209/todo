export enum Priority {
  LOW = "low",
  MEDIUM = "midium",
  HIGH = "high",
}

export enum Status {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
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