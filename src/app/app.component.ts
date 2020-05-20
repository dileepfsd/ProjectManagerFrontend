import {Component, OnInit} from '@angular/core';
import {LoginService} from './service/login.service';
import {Student} from './model/student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.login().subscribe(
      (response: Student) => {
        console.log(response);
      }
    );
  }
}
