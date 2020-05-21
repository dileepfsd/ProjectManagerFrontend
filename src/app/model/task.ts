import {ParentTask} from './parentTask';
import {Project} from './project';

export class Task {
  public taskId: number;
  public taskName: string;
  public startDate: string;
  public endDate: string;
  public priority: number;
  public status: string;
  public userId: number;
  public projectId: number;
  public parentTaskId: number;
  public parentTask: ParentTask;
  public project: Project;
  public userName: string;
}
