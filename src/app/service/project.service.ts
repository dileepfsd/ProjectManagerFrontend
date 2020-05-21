import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  findAllProjects(): Observable<Project> {
    return this.http.get<Project>('http://localhost:8081/project/findAllProjects');
  }
}
