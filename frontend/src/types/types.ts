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
export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
export enum Status {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}
