import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Task } from 'src/app/models/task.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent implements OnInit {
  public task!: Task;
  public owner!: String;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      async (params: Params) => {
        this.projectService.getSingleTaskFromProject(params.idProject, params.idTask).then(
          (task: any) => {
            this.task = task['data'];
            if (this.task._owner != undefined)
              this.userService.getUserById(this.task._owner).then(
                (user: any) => {
                  this.owner = user.data.username;
                }
              );
            else {
              this.owner = "Pas encore attribuée";
            }
          }
        );
      }
    );
  }

}
