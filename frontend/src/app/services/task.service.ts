import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';


@Injectable({  providedIn: 'root'})
export class TaskService{

  
    constructor(private http:HttpClient){}

    getAllTasks():Observable<any>
    {
        return this.http.get('http://localhost:5000/api/tasks/');
    }

    addTask(task: any){
        return new Promise((resolve,reject) => {
            this.http.post('http://localhost:5000/api/addTask/',task).subscribe(
                (response) => {
                    resolve(response);
                  },
                  (error) => {
                    reject(error);
                  }
                );
              });
          }
    
    deleteTask(id: string){
      return new Promise((resolve, reject) => {
        this.http.delete('http://localhost:5000/api/removeTask/' + id).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    updateTask(id: string, task: Task){
      console.log(task);
      return new Promise((resolve, reject) => {
        this.http.put('http://localhost:5000/api/updateTask/' + id, task).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    getTaskById(id: string){
      return new Promise((resolve,reject) => {
        this.http.get('http://localhost:5000/api/tasks/'+ id).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
}