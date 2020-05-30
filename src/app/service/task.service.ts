import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../model/task';
import {environment} from '../../environments/environment';
import {ParentTask} from '../model/parentTask';
import {Project} from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  projectHttpUrl: string = environment.apiUrl + '/task/task/';
  task: Task;

  constructor(private http: HttpClient) {
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.projectHttpUrl + 'create', task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.projectHttpUrl + 'update', task);
  }

  updateTaskStatus(task: Task): Observable<Task> {
    return this.http.post<Task>(this.projectHttpUrl + 'updateTaskStatus', task);
  }

  createParentTask(parentTask: ParentTask): Observable<ParentTask> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(parentTask);
    return this.http.post<ParentTask>(this.projectHttpUrl + 'createParentTask', body, {'headers': headers});
  }

  findAllParentTask(): Observable<ParentTask[]> {
    return this.http.get<ParentTask[]>(this.projectHttpUrl + 'findAllParentTask');
  }

  findAllParentTasksByInput(input: string): Observable<ParentTask[]> {
    return this.http.get<ParentTask[]>(this.projectHttpUrl + 'findAllParentTasksByInput/' + input);
  }

  findTasksByProjectId(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.projectHttpUrl + 'findTasksByProjectId/' + id);
  }

  setTask(task: Task) {
    this.task = task;
  }

  getTask(): Task {
    return this.task;
  }
}
