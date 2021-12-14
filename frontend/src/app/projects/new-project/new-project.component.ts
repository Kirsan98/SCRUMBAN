import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

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
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      title: [null, Validators.required]
    });
  }

  onSubmit() {
    const userId = this.authService.getUserId;
    const project = new Project();
    project.title = this.projectForm.get('title')?.value;
    project._members = [userId];

    this.projectService.addProject(project).then(
      (project: any) => {
        console.log(userId);
        
        this.userService.addProjectToUser(userId, project.data._id);
        this.projectForm.reset();
        this.router.navigate(['project/' + project['data']._id + '/detail']);
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
