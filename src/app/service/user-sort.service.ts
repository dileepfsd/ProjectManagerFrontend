import {Injectable} from '@angular/core';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserSortService {

  users: User[] = [];

  setUsers(users: User[]) {
    this.users = users;
  }

  sortByUserField(field): User[] {
    if ('firstName' === field) {
      return this.users.sort(
        (user1: User, user2: User) => {
          if (user1.firstName > user2.firstName) {
            return 1;
          }
          if (user1.firstName < user2.firstName) {
            return -1;
          }
          return 0;
        });
    } else if ('lastName' === field) {
      return this.users.sort(
        (user1: User, user2: User) => {
          if (user1.lastName > user2.lastName) {
            return 1;
          }
          if (user1.lastName < user2.lastName) {
            return -1;
          }
          return 0;
        });
    } else {
      return this.users.sort(
        (user1: User, user2: User) => {
          if (user1.employeeId > user2.employeeId) {
            return 1;
          }
          if (user1.employeeId < user2.employeeId) {
            return -1;
          }
          return 0;
        });
    }
  }
}
