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
        this.http.delete('http://localhost:5000/api/removeProject/' + id).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    updateProject(id: string, project: Project){
      console.log(project);
      return new Promise((resolve, reject) => {
        this.http.put('http://localhost:5000/api/updateProject/' + id, project).subscribe(
          (response) => {
            console.log(response);
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

    addSprint(id: string,sprint: any){
      return new Promise((resolve,reject) => {
        this.http.post('http://localhost:5000/api/addSprint/'+ id,sprint).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    getSingleSprintByProject(id1: string, id2: string){
      return new Promise((resolve,reject) => {
        this.http.get('http://localhost:5000/api/project/'+ id1+'/sprint/'+id2,).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }



    deleteSingleSprintByProject(id1: string, id2: string){
      return new Promise((resolve,reject) => {
        this.http.delete('http://localhost:5000/api/project/'+ id1+'/delete_sprint/'+id2,).subscribe(
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