import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';



@Injectable({  providedIn: 'root'})
export class ColumnService{
    constructor(private http:HttpClient){}

    addTaskToColumn(idColumn: any,task :any){
        return new Promise((resolve,reject) => {
          this.http.post('http://localhost:5000/api/column/'+ idColumn+'/addTask/'+task._id,task).subscribe(
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