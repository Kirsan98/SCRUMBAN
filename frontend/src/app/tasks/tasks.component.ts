import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks:any[] = [];
  
  constructor(
    private router: Router,
    public taskService: TaskService 
  ){ }

  ngOnInit(): void {
    this.listTask();
  }

  listTask(): void{
    // this.taskService.getAllTasks().subscribe(
    // data => {
    //   // this.tasks = data['data'];
    //   console.log(this.tasks);
    // });
  }

  onTaskClicked(idTask :string){
    this.router.navigate(['/task/' + idTask]);
  }

  onDelete(id: string){
   this.router.navigate(['/deleteTask/' + id]);
  }

  onUpdate(id: string){
   this.router.navigate(['/taskSettings/' + id]); 
  }
}
