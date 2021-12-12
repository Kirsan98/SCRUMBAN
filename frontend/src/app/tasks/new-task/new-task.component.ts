import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Task } from 'src/app/models/task.model';
import { Project } from 'src/app/models/project.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  public taskForm !: FormGroup;
  public project !: Project;
  public errorMessage !: string;

  users: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public loadUsers() {
    this.userService.getAllUsersFromProject(this.project._id).then(
      (usersIdResp: any) => {
        usersIdResp.data.forEach((userId: any) => {
          this.userService.getUserById(userId).then(
            (userResp: any) => {
              this.users.push(userResp.data);
            }
          );
        });
      }
    );
  }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: [null, Validators.required],
      color: [null, Validators.required],
      description: [null, Validators.required],
      estimated_duration: [null, Validators.required],
      owner: []
    });
    this.route.params.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.idProject).then(
          (project: any) => {
            this.project = project['data'];
            this.loadUsers();
          });
      }
    );
  }

  public loadTask(): Task {
    const task = new Task();
    task.title = this.taskForm.get('title')?.value;
    task.color = this.taskForm.get('color')?.value;
    task.description = this.taskForm.get('description')?.value;
    task.state = "UNDEFINED";
    task.estimated_duration = this.taskForm.get('estimated_duration')?.value;
    if ( (this.taskForm.get('owner')?.value != "null") && (this.taskForm.get('owner')?.value !="blank"))
      task._owner = this.taskForm.get('owner')?.value;
    return task;
  }

  onSubmit() {
    const task = this.loadTask();

    this.projectService.addTask(this.project._id, task).then(
      (success) => {
        console.log(success);
        this.taskForm.reset();
        this.router.navigate(['project/' + this.project._id + '/tasks']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    )
  }
}
