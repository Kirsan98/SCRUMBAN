import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from '../services/task.service';

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
  ){ }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.projectService.getTasksFromProject(params.id).then(
          (project: any) => {
            this.project = project['data'];
            console.log(project);
            this.tasks = this.project.tasks;
          });
      }
    );
  }

  onTaskClicked(idProject :string, idTask: string){
    this.router.navigate(['/project/' + idProject + '/task/' + idTask]);
  }
}
