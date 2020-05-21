import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Options} from 'ng5-slider';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm, ValidationErrors} from '@angular/forms';
import {ProjectService} from '../../service/project.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Project} from '../../model/project';
import {User} from '../../model/user';
import {DatePipe} from '@angular/common';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

  @Input() errors: ValidationErrors;
  @ViewChild('projectForm') projectForm: NgForm;
  project: Project;
  dateFieldActive: boolean = true;
  bsModalRef: BsModalRef;
  users: User[] = [];
  user: User;
  search: boolean = false;
  edit: boolean = false;
  startEndDateCheckBox: boolean = false;
  inValidManager: boolean = false;

  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 30
  };

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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private  datePipe: DatePipe,
              private projectService: ProjectService,
              private bsModalService: BsModalService,
              private userService: UserService) {
    this.project = new Project();
    this.user = new User();
  }

  ngOnInit() {
    this.userService.findAllUser().subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
  }

  setDateField() {
    if (this.projectForm.control.get('startEndDateCheckBox').value) {
      this.dateFieldActive = false;
      const startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      const date = new Date();
      date.setDate(date.getDate() + 1);
      const endDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      this.projectForm.control.get('startDate').setValue(startDate);
      this.projectForm.control.get('endDate').setValue(endDate);
    } else {
      this.dateFieldActive = true;
      this.projectForm.control.get('startDate').setValue('');
      this.projectForm.control.get('endDate').setValue('');
    }
  }

  onSubmit() {
    this.edit = false;
    const startDateRef = this.projectForm.control.get('startDate');
    const endDateRef = this.projectForm.control.get('endDate');
    const priorityRef = this.projectForm.control.get('priority');
    const managerRef = this.projectForm.control.get('manager');
    const startEndDateCheckBoxRef = this.projectForm.control.get('startEndDateCheckBox');

    const d1 = new Date(startDateRef.value);
    const d2 = new Date(endDateRef.value);
    const priority = priorityRef.value;

    if (d1 > d2) {
      startDateRef.setErrors({
        'invalidDate': true
      });
      endDateRef.setErrors({
        'invalidDate': true
      });
    }

    if (priority <= 0) {
      priorityRef.setErrors({
        'invalidPriority': true
      });
    }
    if (managerRef.value === '') {
      managerRef.setErrors({
        'inValidManager': true,
      });
      this.inValidManager = true;
    }
    if (!startEndDateCheckBoxRef.value) {
      this.projectForm.control.get('startEndDateCheckBox').setErrors(
        {
          'emptyDate': true
        }
      );
    }
    if ((d1 > d2) || (managerRef.value === '') || (priority <= 0) || !startEndDateCheckBoxRef.value) {
      return;
    }
    this.project = new Project();
    this.project.projectTitle = this.projectForm.control.get('projectTitle').value;
    this.project.startDate = startDateRef.value;
    this.project.endDate = endDateRef.value;
    this.project.priority = priorityRef.value;
    this.project.userId = this.user.userId;
    this.project.projectId = this.projectForm.control.get('projectId').value;
    this.projectService.createProject(this.project).subscribe(
      (project: Project) => {
        this.project = project;
        this.projectForm.reset();
      }
    );
  }

  removeBorderColor() {
    const startDate = this.projectForm.control.get('startDate');
    const endDate = this.projectForm.control.get('endDate');
    endDate.setErrors(null);
    startDate.setErrors(null);
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.bsModalService.show(template);
  }

  selectUser(user: User) {
    this.user = user;
    this.projectForm.control.get('manager').setValue(user.firstName);
    this.projectForm.control.get('manager').setErrors(null);
    this.inValidManager = false;
  }

  onReset() {
    this.projectForm.reset();
  }

  displayProject(project: Project) {
    this.dateFieldActive = false;
    this.projectForm.control.get('projectTitle').setValue(project.projectTitle);
    this.projectForm.control.get('startDate').setValue(project.startDate);
    this.projectForm.control.get('endDate').setValue(project.endDate);
    this.projectForm.control.get('priority').setValue(project.priority);
    this.projectForm.control.get('projectId').setValue(project.projectId);
    /*    if (project.users.length > 0) {
          this.projectForm.control.get('manager').setValue(project.users[0].firstName);
        }
        if (project.users.length === 0) {
          this.projectForm.control.get('manager').setValue('');
        }*/
    this.projectForm.control.get('startEndDateCheckBox').setValue(true);
  }

  buttonAction(btnAction: string) {
    if (btnAction === 'update') {
      this.edit = true;
    } else if (btnAction === 'delete') {
      this.edit = false;
      this.projectForm.control.get('projectTitle').setValue('');
      this.projectForm.control.get('startDate').setValue('');
      this.projectForm.control.get('endDate').setValue('');
      this.projectForm.control.get('priority').setValue('');
      this.projectForm.control.get('manager').setValue('');
      this.projectForm.control.get('startEndDateCheckBox').setValue(false);
    }
  }
}
