import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Options} from 'ng5-slider';
import {NgForm, ValidationErrors} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {Task} from '../../model/task';
import {User} from '../../model/user';
import {Project} from '../../model/project';
import {ParentTask} from '../../model/parentTask';
import {TaskService} from '../../service/task.service';
import {UserService} from '../../service/user.service';
import {ProjectService} from '../../service/project.service';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {

  task: Task;
  bsModalRef: BsModalRef;
  user: User;
  project: Project;
  parentTasks: ParentTask[] = [];
  parentTask: ParentTask;
  projectName: string;
  projectId: number;
  endTask: boolean;

  @ViewChild('taskForm') taskForm: NgForm;
  @Input() errors: ValidationErrors;

  options: Options = {
    floor: 0,
    ceil: 30
  };

  constructor(private taskService: TaskService,
              private userService: UserService,
              private projectService: ProjectService,
              private bsModalService: BsModalService,
              private router: Router
  ) {
    this.task = new Task();
    this.user = new User();
    this.project = new Project();
    this.parentTask = new ParentTask();
  }

  ngOnInit() {
    this.task = this.taskService.getTask();
    if ('COMPLETE' === this.task.status) {
      this.endTask = true;
    }
    if (this.task.parentTask === null) {
      this.parentTask = new ParentTask();
      this.task.parentTask = this.parentTask;
    } else {
      this.parentTask = this.task.parentTask;
    }
    this.projectId = this.task.project.projectId;
  }

  onSubmit() {
    const startDateRef = this.taskForm.control.get('startDate');
    const endDateRef = this.taskForm.control.get('endDate');
    const priorityRef = this.taskForm.control.get('priority');
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

    if ((d1 > d2) || (priority <= 0)) {
      return;
    }
    this.projectName = this.taskForm.control.get('projectTitle').value;
    this.task.userId = this.user.userId;
    this.task.projectId = this.project.projectId;
    this.task.parentTaskId = this.taskForm.control.get('parentId').value;
    this.taskService.updateTask(this.task).subscribe(
      (response: Task) => {
        this.router.navigate(['/viewtask'], {queryParams: {projectName: this.projectName, pId: this.projectId}});
        this.taskForm.reset();
      }
    );
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

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.bsModalService.show(template);
  }

  loadParentTask() {
    this.taskService.findAllParentTask().subscribe(
      (parentTasks: ParentTask[]) => {
        this.parentTasks = parentTasks;
      }
    );
  }

  _parentTaskSearchVal: string;
  get parentTaskSearchVal(): string {
    return this._parentTaskSearchVal;
  }

  @Input('parentTaskSearchVal')
  set parentTaskSearchVal(input: string) {
    if (input === '') {
      input = 'default';
    }
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

  selectParentTask(parentTask: ParentTask) {
    this.parentTask = parentTask;
    this.taskForm.control.get('parentTaskName').setValue(parentTask.parentTaskName);
  }
}
