import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public project!: Project;
  public tasks!: Task[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.idProject)
          .then(
            (project: any) => {
              this.project = project['data'];
            }
          );
        this.projectService.getAllTaskFromProject(params.idProject)
          .then(
            (tasks: any) => {
              this.tasks = tasks['data'];
            }
          );
      }
    );
  }

  onTaskClicked(idProject: string, idTask: string) {
    this.router.navigate(['/project/' + idProject + '/task/' + idTask]);
  }

  onDelete(idProject: string, idTask: string){
    this.router.navigate(['/project/' + idProject +'/delete-task/' + idTask]);
  }
}