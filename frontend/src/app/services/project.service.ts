import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';



@Injectable({  providedIn: 'root'})
export class ProjectService{

  
    constructor(private http:HttpClient){}

    getAllProjects():Observable<any>
    {
        return this.http.get('http://localhost:5000/api/projects/');
    }

    addProject(project: any){
        //return this.http.post("http://localhost:5000/api/addProject/",project);
        return new Promise((resolve,reject) => {
            this.http.post('http://localhost:5000/api/addProject/',project).subscribe(
                (response) => {
                    resolve(response);
                  },
                  (error) => {
                    reject(error);
                  }
                );
              });
          }
    
    deleteProject(id: string){
      return new Promise((resolve, reject) => {
        this.http.delete('http://localhost:5000/api/projects/' + id).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    getProjectById(id: string){
      return new Promise((resolve,reject) => {
        this.http.get('http://localhost:5000/api/projects/'+ id).subscribe(
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