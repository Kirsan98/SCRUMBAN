import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';

@Injectable({  providedIn: 'root'})
export class TaskService{

    constructor(private http:HttpClient){}

    getAllTasks(idProject : string){
      // return new Promise((resolve, reject) => {
      //   this.http.get('http://localhost:5000/api/project/' + idProject + '/tasks').subscribe(
      //     (response) => {
      //       resolve(response);
      //     },
      //     (error) => {
      //       reject(error);
      //     }
      //   );
      // });
      return this.http.get('http://localhost:5000/api/project/' + idProject + '/tasks');
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