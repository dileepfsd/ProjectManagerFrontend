import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  findAllTasks(): Observable<Task> {
    return this.http.get<Task>('http://localhost:8081/task/');
  }
}
