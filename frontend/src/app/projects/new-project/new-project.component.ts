import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  public projectForm !: FormGroup;
  public errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router
    ) { }

  ngOnInit(){
    this.projectForm = this.formBuilder.group({
      title: [null,Validators.required]
    });
  }

  onSubmit(){
    const project = new Project();
    project.title = this.projectForm.get('title')?.value;
    this.projectService.addProject(project).then(
      ()=>{
        this.projectForm.reset();
        this.router.navigate(['projects']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    )
  }

  ngOnDestroy() {
  }
}
