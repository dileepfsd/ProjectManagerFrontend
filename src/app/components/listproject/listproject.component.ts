import {Component, EventEmitter, Input, Output, OnChanges, SimpleChanges} from '@angular/core';
import {Project} from '../../model/project';
import {ProjectService} from '../../service/project.service';
import {ProjectSortService} from '../../service/project-sort.service';

@Component({
  selector: 'app-listproject',
  templateUrl: './listproject.component.html',
  styleUrls: ['./listproject.component.css']
})
export class ListprojectComponent implements OnChanges {

  @Input('project') project: Project;
  projects: Project[] = [];
  search: boolean = false;
  @Output()
  public projectEmitter: EventEmitter<Project> = new EventEmitter<Project>();
  @Output()
  public projectActionEmitter: EventEmitter<string> = new EventEmitter<string>();

  _searchVal: string;

  constructor(private projectService: ProjectService,
              private projectSortService: ProjectSortService) {
  }

  get searchVal(): string {
    return this._searchVal;
  }

  @Input('searchVal')
  set searchVal(input: string) {
    if (input === '') {
      input = 'default';
    };
    this.search = true;
    this.projectService.findAllProjectByInputWithTask(input).subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      }
    );
    if (input === 'default') {
      input = '';
    }
    this._searchVal = input;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.projectService.findAllProjectsWithTaskStatus().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      }
    );
  }

  onSort(field) {
    this.projectSortService.setProjects(this.projects);
    this.projectSortService.sortByProjectField(field);
  }

  onUpdate(projectId: number) {
    this.projectService.findProjectById(projectId).subscribe(
      (project: Project) => {
        this.projectActionEmitter.emit('update');
        this.projectEmitter.emit(project);
      }
    );
  }

  onDelete(id: number) {
    this.projectService.deleteProject(id).subscribe(
      (project: Project) => {
        this.projectActionEmitter.emit('delete');
        this.projectService.findAllProjects().subscribe(
          (projects: Project[]) => {
            this.projects = projects;
          }
        );
      }
    );
  }
}
