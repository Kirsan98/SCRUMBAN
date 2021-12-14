import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { Project } from 'src/app/models/project.model';
import { UserService } from 'src/app/services/user.service';

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

  public users: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private userService: UserService
  ) { }

  public loadUsers() {
    this.users = [];
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
    this.updateTaskForm = this.formBuilder.group({
      title: [null],
      color: [null],
      description: [null],
      state: [null],
      estimated_duration: [null],
      owner: [null]
    })
    this.route.params.subscribe(
      (params) => {
        this.projectService.getProjectById(params.idProject).then(
          (project: any) => {
            this.project = project.data;
            this.loadUsers();
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
            const userId = this.task._owner;
            
            this.userService.getUserById(userId).then(
              (userData: any) => {
                this.updateTaskForm.get('owner')?.setValue(userData.data.username);
              }
            );
          }
        );
      }
    );
  }

  onSubmit() {
    const taskUpdated = new Task();
    taskUpdated.title = this.updateTaskForm.get('title')?.value;
    taskUpdated.color = this.updateTaskForm.get('color')?.value;
    taskUpdated.description = this.updateTaskForm.get('description')?.value;
    taskUpdated.state = this.updateTaskForm.get('state')?.value;
    taskUpdated.estimated_duration = this.updateTaskForm.get('estimated_duration')?.value;
    const username = this.updateTaskForm.get('owner')?.value;
    console.log(username, "username from update-task");
    
    this.userService.getUserByUsername(username).then(
      (user: any) => {
        console.log(user, "user from update-task");
        
        taskUpdated._owner = user.data._id;
        console.log(taskUpdated);
        
        this.taskService.updateTask(this.task._id, taskUpdated).then(
          () => {
            this.loadUsers;
            this.updateTaskForm.reset();
            this.router.navigate(['project/' + this.project._id + '/tasks']);
          }
        ).catch(
          (error) => {
            this.errorMessage = error.message;
          }
        )
      }
    );
  }
}
