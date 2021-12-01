import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  public task !: Task;
  public project !: Project;
  public updateTaskForm !: FormGroup;
  public errorMessage !: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService   
  ) { }

  ngOnInit(): void {
    this.updateTaskForm = this.formBuilder.group({
      title: [null],
      color: [null],
      description: [null],
      state: [null],
      estimated_duration: [null]
    })
    this.route.params.subscribe(
      (params) => {
        this.projectService.getProjectById(params.idProject).then(
          (project: any) => {
            this.project = project.data;
          }
        );
        this.projectService.getSingleTaskFromProject(params.idProject, params.idTask).then(
          (task: any) => {
            this.task = task.data;
            this.updateTaskForm.get('title')?.setValue(this.task.title);
            this.updateTaskForm.get('color')?.setValue(this.task.color);
            this.updateTaskForm.get('description')?.setValue(this.task.description);
            this.updateTaskForm.get('state')?.setValue(this.task.state);
            this.updateTaskForm.get('estimated_duration')?.setValue(this.task.estimated_duration);
          }
        );
      }
    );
  }

  onSubmit(){
    const taskUpdated = new Task();
    taskUpdated.title = this.updateTaskForm.get('title')?.value;
    taskUpdated.color = this.updateTaskForm.get('color')?.value;
    taskUpdated.description = this.updateTaskForm.get('description')?.value;
    taskUpdated.state = this.updateTaskForm.get('state')?.value;
    taskUpdated.estimated_duration = this.updateTaskForm.get('estimated_duration')?.value;
    this.taskService.updateTask(this.task._id, taskUpdated).then(
      () => {
        this.updateTaskForm.reset();
        this.router.navigate(['project/'+ this.project._id + '/tasks']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    )
  }
}
