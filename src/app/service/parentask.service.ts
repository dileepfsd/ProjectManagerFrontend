import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ParentTask} from '../model/parentTask';

@Injectable({
  providedIn: 'root'
})
export class ParentaskService {

  constructor(private http: HttpClient) {
  }

  findAllParentTasks(): Observable<ParentTask> {
    return this.http.get<ParentTask>('http://localhost:8081/task/findAllParent');
  }
}
