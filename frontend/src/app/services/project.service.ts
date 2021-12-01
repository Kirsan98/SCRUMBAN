import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
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
            this.http.post('http://localhost:5000/api/add-project/',project).subscribe(
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
        this.http.delete('http://localhost:5000/api/remove-project/' + id).subscribe(
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
        this.http.put('http://localhost:5000/api/update-project/' + id, project).subscribe(
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
        this.http.get('http://localhost:5000/api/project/'+ id).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    addSprint(idProject: string,sprint: any){
      return new Promise((resolve,reject) => {
        this.http.post('http://localhost:5000/api/project/'+ idProject+'/add-sprint',sprint).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    getSingleSprintByProject(idProject: string, idSprint: string){
      return new Promise((resolve,reject) => {
        this.http.get('http://localhost:5000/api/project/'+ idProject+'/sprint/'+idSprint,).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    getAllSprintByProject(idProject: string){
      return new Promise((resolve,reject) => {
        this.http.get('http://localhost:5000/api/project/'+ idProject+'/sprints/').subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    deleteSingleSprintByProject(idProject: string, idSprint: string){
      return new Promise((resolve,reject) => {
        this.http.delete('http://localhost:5000/api/project/'+ idProject+'/delete-sprint/'+idSprint,).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    getAllTaskFromProject(idProject: string){
      return new Promise((resolve,reject) => {
        this.http.get('http://localhost:5000/api/project/'+ idProject +'/tasks/').subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    getSingleTaskFromProject(idProject: string, idTask: string){
      return new Promise((resolve,reject) => {
        this.http.get('http://localhost:5000/api/project/'+ idProject + '/task/' + idTask).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    addTask(idProject: string, task : any){
      return new Promise((resolve,reject) => {
        this.http.post('http://localhost:5000/api/project/'+ idProject + '/add-task/',task).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    deleteSingleTaskByProject(idProject: string, idTask: string){
      return new Promise((resolve,reject) => {
        this.http.delete('http://localhost:5000/api/project/'+ idProject +'/delete-task/'+ idTask).subscribe(
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