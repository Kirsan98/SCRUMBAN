import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent implements OnInit {
  public task!: Task;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      async (params: Params) => {
        this.projectService.getSingleTaskFromProject(params.idProject, params.idTask).then(
          (task: any) => {
            console.log(task);
            this.task = task['data'];
          }
        );
      }
    );
  }

}
