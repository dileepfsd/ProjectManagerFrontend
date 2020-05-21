import {Injectable} from '@angular/core';
import {Project} from '../model/project';
import {Task} from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskSortService {

  constructor() {
  }

  tasks: Task[] = [];

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  sortByTaskField(field): Task[] {
    if ('startDate' === field) {
      return this.tasks.sort(function (task1: Task, task2: Task): any {
        const d1: Date = new Date(task1.startDate);
        const d2: Date = new Date(task2.startDate);
        return (d1.getTime() - d2.getTime());
      });
    } else if ('endDate' === field) {
      return this.tasks.sort(function (task1: Task, task2: Task): any {
        const d1: Date = new Date(task1.endDate);
        const d2: Date = new Date(task2.endDate);
        return (d1.getTime() - d2.getTime());
      });
    } else if ('priority' === field) {
      return this.tasks.sort(function (task1: Task, task2: Task): any {
        const d1: number = task1.priority;
        const d2: number = task2.priority;
        return (d1 - d2);
      });
    } else if ('completed' === field) {
      return this.tasks.sort(function (task1: Task, task2: Task): any {
        const d1: string = task1.status;
        const d2: string = task2.status;
        return (d1.localeCompare(d2));
      });
    }
  }
}
