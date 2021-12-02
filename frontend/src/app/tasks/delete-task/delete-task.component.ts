import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Task } from 'src/app/models/task.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {
  public project!: Project;
  public task!: Task;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    console.log("on est dans le component delete-task");
    this.route.paramMap.subscribe(
      (params: Params) => {
          this.projectService.getProjectById(params.params.idProject).then(
            (project: any) => {
              this.project = project['data']
            }
          )        
          this.projectService.getSingleTaskFromProject(params.params.idProject, params.params.idTask).then(
          (task: any) => {
            this.task = task['data']
            console.log(this.task);
          }
          );
        }
      );
  }

  onDelete(){
    this.projectService.deleteSingleTaskByProject(this.project._id,this.task._id).then(
      () => {
        this.router.navigate(['project/'+this.project._id+'/tasks']);
      }
    )
  }
}