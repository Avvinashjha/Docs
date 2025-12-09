import { Priority, Status } from "../models/task";

export interface GetTaskProps {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: string;
  priority?: Priority;
  status?: Status;
  search?: string;
}