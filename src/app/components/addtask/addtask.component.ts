import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Options} from 'ng5-slider';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {NgForm, ValidationErrors} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {User} from '../../model/user';
import {Project} from '../../model/project';
import {ParentTask} from '../../model/parentTask';
import {Task} from '../../model/task';
import {UserService} from '../../service/user.service';
import {ProjectService} from '../../service/project.service';
import {TaskService} from '../../service/task.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  @ViewChild('taskForm') taskForm: NgForm;
  @Input() errors: ValidationErrors;

  bsModalRef: BsModalRef;
  _searchVal: string;
  search: boolean = false;
  users: User[] = [];
  user: User;
  projects: Project[] = [];
  project: Project;
  parentTasks: ParentTask[] = [];
  parentTask: ParentTask;
  task: Task;
  projectName: string = '';
  parentTaskName: string = '';
  firstName: string = '';
  parentTaskRef: boolean = false;

  _projectSearchVal: string;
  _parentTaskSearchVal: string;

  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 30
  };

  constructor(private bsModalService: BsModalService,
              private userService: UserService,
              private projectService: ProjectService,
              private taskService: TaskService,
              private  datePipe: DatePipe,
              private router: Router,
              private location: Location
  ) {
    this.user = new User();
    this.project = new Project();
    this.task = new Task();
    this.parentTask = new ParentTask();
  }

  ngOnInit() {
    const startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const endDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.task.startDate = startDate;
    this.task.endDate = endDate;

    this.userService.findAllUser().subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );

    this.projectService.findAllProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      }
    );

    this.taskService.findAllParentTask().subscribe(
      (parentTasks: ParentTask[]) => {
        this.parentTasks = parentTasks;
      }
    );
  }

  get projectSearchVal(): string {
    return this._projectSearchVal;
  }

  @Input('projectSearchVal')
  set projectSearchVal(input: string) {
    if (input === '') {
      input = 'default';
    }
    this.search = true;
    this.projectService.findAllProjectByInput(input).subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      }
    );
    if (input === 'default') {
      input = '';
    }
    this._projectSearchVal = input;
  }

  get parentTaskSearchVal(): string {
    return this._parentTaskSearchVal;
  }

  @Input('parentTaskSearchVal')
  set parentTaskSearchVal(input: string) {
    if (input === '') {
      input = 'default';
    }
    this.search = true;
    this.taskService.findAllParentTasksByInput(input).subscribe(
      (parentTasks: ParentTask[]) => {
        this.parentTasks = parentTasks;
      }
    );
    if (input === 'default') {
      input = '';
    }
    this._parentTaskSearchVal = input;
  }


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

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.bsModalService.show(template);
  }

  selectUser(user: User) {
    this.user = user;
    this.firstName = this.user.firstName;
  }

  selectProject(project: Project) {
    this.project = project;
    this.projectName = this.project.projectTitle;
  }

  selectParentTask(parentTask: ParentTask) {
    this.parentTask = parentTask;
    this.taskForm.control.get('parentTaskName').setValue(parentTask.parentTaskName);
  }

  loadParentTask() {
    this.taskService.findAllParentTask().subscribe(
      (parentTasks: ParentTask[]) => {
        this.parentTasks = parentTasks;
      }
    );
  }

  onSubmit() {
    const parentTask = this.taskForm.control.get('parentTask').value;

    if (parentTask) {
      this.parentTask = new ParentTask();
      this.parentTask.parentTaskName = this.taskForm.control.get('taskName').value;
      this.taskService.createParentTask(this.parentTask).subscribe(
        () => {
          this.taskForm.reset();
          this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => {
            this.router.navigate([decodeURI(this.location.path())]);
          });
        }
      );
    } else {
      const startDateRef = this.taskForm.control.get('startDate');
      const endDateRef = this.taskForm.control.get('endDate');
      const priorityRef = this.taskForm.control.get('priority');

      const projectTitleRef = this.taskForm.control.get('projectTitle');
      const parentRef = this.taskForm.control.get('parentTaskName');
      const userRef = this.taskForm.control.get('user');
      const d1 = new Date(startDateRef.value);
      const d2 = new Date(endDateRef.value);
      const priority = priorityRef.value;

      if (d1 > d2) {
        startDateRef.setErrors({
          'inValidDate': true
        });
        endDateRef.setErrors({
          'inValidDate': true
        });
      }

      if (priority <= 0) {
        priorityRef.setErrors({
          'invalidPriority': true
        });
      }

      if (projectTitleRef.value === '') {
        projectTitleRef.setErrors({
          'inValidProject': true
        });
      }

      if (userRef.value === '') {
        userRef.setErrors({
          'inValidUser': true
        });
      }

      if ((d1 > d2) || (projectTitleRef.value === '') || (priority <= 0)) {
        return;
      }
      this.task.startDate = this.taskForm.control.get('startDate').value;
      this.task.endDate = this.taskForm.control.get('endDate').value;
      this.task.priority = this.taskForm.control.get('priority').value;
      this.task.userId = this.user.userId;
      this.task.projectId = this.project.projectId;
      this.task.parentTaskId = this.parentTask.id;
      this.task.taskName = this.taskForm.control.get('taskName').value;
      this.taskService.createTask(this.task).subscribe(
        (response: Task) => {
          this.taskForm.reset();
        }
      );
    }

    this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  removeBorderColor() {
    const startDate = this.taskForm.control.get('startDate');
    const endDate = this.taskForm.control.get('endDate');
    if (startDate.value != null) {
      startDate.setErrors(null);
    }
    if (endDate.value != null) {
      endDate.setErrors(null);
    }
  }

  parentTaskConfirm() {
    this.parentTaskRef = this.taskForm.control.get('parentTask').value;
  }

  onReset() {
    this.taskForm.reset();
  }
}
