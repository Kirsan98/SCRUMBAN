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
      title: [null, Validators.required]
    });
    this.route.params.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.idProject).then(
          (project: any) => {
            this.project = project['data'];
          });
        }
      );
  }

  onSubmit(){
    const task = new Task();
    task.title = this.taskForm.get('title')?.value;
    this.projectService.addTask(this.project._id, task).then(
      ()=>{
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
