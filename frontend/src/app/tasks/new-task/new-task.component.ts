import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Task } from 'src/app/models/task.model';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  public taskForm !: FormGroup;
  public project !: Project;
  public errorMessage !: string;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: [null, Validators.required],
      color: [null, Validators.required],
      description: [null, Validators.required],
      state: [null, Validators.required],
      estimated_duration: [null, Validators.required]
    });
    this.route.params.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.idProject).then(
          (project: any) => {
            this.project = project['data'];
            console.log(this.project.tasks);
          });
        }
      );
  }

  onSubmit(){
    const task = new Task();
    task.title = this.taskForm.get('title')?.value;
    task.color = this.taskForm.get('color')?.value;
    task.description = this.taskForm.get('description')?.value;
    task.state = this.taskForm.get('state')?.value;
    task.estimated_duration = this.taskForm.get('estimated_duration')?.value;
    console.log(task);
    
    this.projectService.addTask(this.project._id, task).then(
      (success)=>{
        console.log(success);
        this.taskForm.reset();
        this.router.navigate(['project/'+this.project._id + '/tasks']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    )
  }
}
