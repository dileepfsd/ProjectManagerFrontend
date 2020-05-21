import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  @ViewChild('userForm') userForm: NgForm;
  user: User;
  userExist: boolean;

  constructor(private userService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.userService.usersEmitter.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

  onSubmit() {
    this.userService.createUser(this.user).subscribe(
      (user: User) => {
        this.user = user;
        this.userForm.reset();
        this.userExist = false;
        this.user.edit = false;
      },
      error => {
        this.userExist = true;
      }
    );
  }

  onReset() {
    this.userForm.reset();
  }
}
