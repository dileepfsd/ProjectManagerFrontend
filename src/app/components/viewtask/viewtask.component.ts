import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Location} from '@angular/common';
import {Project} from '../../model/project';
import {Task} from '../../model/task';
import {ProjectService} from '../../service/project.service';
import {TaskService} from '../../service/task.service';
import {TaskSortService} from '../../service/task-sort.service';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  projects: Project[] = [];
  tasks: Task[] = [];
  bsModalRef: BsModalRef;
  project: Project;
  projectName: string;
  projectId: number;
  display: boolean = false;

  @ViewChild('viewTaskForm') viewTaskForm: NgForm;

  constructor(private projectService: ProjectService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private taskService: TaskService,
              private location: Location,
              private taskSortService: TaskSortService,
              private bsModalService: BsModalService) {
    this.project = new Project();
  }

  ngOnInit() {
    this.projects = [];
    this.tasks = [];

    this.projectName = this.activatedRoute.snapshot.queryParamMap.get('projectName');
    this.projectId = +this.activatedRoute.snapshot.queryParamMap.get('pId');
    if (this.projectName != null) {
      this.taskService.findTasksByProjectId(this.projectId).subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        }
      );
    }
  }

  onEditTask(task: Task) {
    this.taskService.setTask(task);
    this.router.navigate(['edittask']);
  }

  updateTaskStatus(task: Task) {
    this.taskService.updateTaskStatus(task).subscribe(
      () => {
        this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => {
          this.router.navigate([decodeURI(this.location.path())], {queryParams: {projectName: this.projectName, pId: this.projectId}});
        });
      }
    )
    ;
    task = new Task();
  }

  displayTasks() {
    this.display = true;
    this.taskService.findTasksByProjectId(this.project.projectId).subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.bsModalService.show(template);
  }

  _searchVal: string;

  get searchVal(): string {
    return this._searchVal;
  }

  _projectSearchVal: string;
  get projectSearchVal(): string {
    return this._projectSearchVal;
  }

  @Input('projectSearchVal')
  set projectSearchVal(input: string) {
    if (input === '') {
      input = 'default';
    }
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

  selectProject(project: Project) {
    this.project = project;
    this.projectName = this.project.projectTitle;
    this.projectId = this.project.projectId;
  }


  listAllProjects() {
    this.projectService.findAllProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      }
    );
  }

  onSort(field) {
    this.taskSortService.setTasks(this.tasks);
    this.taskSortService.sortByTaskField(field);
  }

}
