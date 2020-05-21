import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  projectHttpUrl: string = environment.apiUrl + '/user/';

  public usersEmitter: EventEmitter<User> = new EventEmitter<User>();

  constructor(private http: HttpClient) {
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.projectHttpUrl + 'create', user);
  }

  findAllUserByInput(input: string): Observable<User[]> {
    return this.http.get<User[]>(this.projectHttpUrl + 'findAllUserByInput/' + input);
  }

  findAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.projectHttpUrl + 'findAllUser');
  }

  findUserById(id: number): Observable<User> {
    return this.http.get<User>(this.projectHttpUrl + 'findUserById/' + id);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.post<User>(this.projectHttpUrl + 'delete', id);
  }
}
