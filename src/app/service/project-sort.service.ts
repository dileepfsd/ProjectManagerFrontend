import {Injectable} from '@angular/core';
import {Project} from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectSortService {

  constructor() {
  }

  projects: Project[] = [];

  setProjects(projects: Project[]) {
    this.projects = projects;
  }

  sortByProjectField(field): Project[] {
    if ('startDate' === field) {
      return this.projects.sort(function (project1: Project, project2: Project): any {
        const d1: Date = new Date(project1.startDate);
        const d2: Date = new Date(project2.startDate);
        return (d1.getTime() - d2.getTime());
      });
    } else if ('endDate' === field) {
      return this.projects.sort(function (project1: Project, project2: Project): any {
        const d1: Date = new Date(project1.endDate);
        const d2: Date = new Date(project2.endDate);
        return (d1.getTime() - d2.getTime());
      });
    } else if ('priority' === field) {
      return this.projects.sort(function (project1: Project, project2: Project): any {
        const d1: number = project1.priority;
        const d2: number = project2.priority;
        return (d1 - d2);
      });
    } else if ('completed' === field) {
      return this.projects.sort(function (project1: Project, project2: Project): any {
        const d1: number = project1.totalNoOfCompletedTasks;
        const d2: number = project2.totalNoOfCompletedTasks;
        return (d1 - d2);
      });
    }
  }
}
