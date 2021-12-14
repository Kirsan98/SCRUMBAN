import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-join-project',
  templateUrl: './join-project.component.html',
  styleUrls: ['./join-project.component.scss']
})
export class JoinProjectComponent implements OnInit {
  public joinProjectForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.joinProjectForm = this.formBuilder.group({
      idProjet: [null, Validators.required]
    });
  }


  onSubmit() {
    const userId = this.authService.getUserId;
    const projectId = this.joinProjectForm.get('idProjet')?.value;
    this.projectService.addUserToProject(projectId, userId)
      .then(
        (newProj: any) => {
          console.log(newProj);
        }
      );
    this.userService.addProjectToUser(userId, projectId)
    .then(
      (user: any) => {
        console.log(user);
      }
    );
      this.router.navigate(['project/' + projectId]);
  }

}
