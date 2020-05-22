import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../model/project';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectHttpUrl: string = environment.apiUrl + '/project/';

  constructor(private http: HttpClient) {
  }

  createProject(project: Project): Observable<Project> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(project);
    return this.http.post<Project>(this.projectHttpUrl + 'create', body, {'headers': headers});
  }

  findAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectHttpUrl + 'findAllProjects');
  }

  findAllProjectsWithTaskStatus(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectHttpUrl + 'findAllProjectsWithTaskStatus');
  }

  findAllProjectByInput(input: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectHttpUrl + 'findAllProjectByInput/' + input);
  }

  findAllProjectByInputWithTask(input: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectHttpUrl + 'findAllProjectByInputWithTask/' + input);
  }

  findProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(this.projectHttpUrl + 'findProjectById/' + id);
  }

  deleteProject(id: number): Observable<Project> {
    return this.http.post<Project>(this.projectHttpUrl + 'delete', id);
  }
}
