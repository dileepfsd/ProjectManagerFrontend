import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {UserSortService} from '../../service/user-sort.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnChanges {

  @Input('user') user: User;
  users: User[] = [];
  search: boolean = false;

  constructor(private userService: UserService,
              private sortService: UserSortService) {
  }

  _searchVal: string;
  get searchVal(): string {
    return this._searchVal;
  }

  @Input('searchVal')
  set searchVal(input: string) {
    if (input === '') {
      input = 'default';
    }
    this.search = true;
    this.userService.findAllUserByInput(input).subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    if (input === 'default') {
      input = '';
    }
    this._searchVal = input;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userService.findAllUser().subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
  }

  onEdit(id: number) {
    this.userService.findUserById(id).subscribe(
      (user: User) => {
        user.edit = true;
        this.userService.usersEmitter.emit(user);
      }
    );
  }

  onDelete(id: number) {
    this.userService.deleteUser(id).subscribe(
      (user: User) => {
        user.firstName = '';
        user.lastName = '';
        user.employeeId = null;
        user.edit = false;
        this.userService.usersEmitter.emit(user);
      }
    );
  }

  onSort(field) {
    this.sortService.setUsers(this.users);
    this.users = this.sortService.sortByUserField(field);
  }
}
