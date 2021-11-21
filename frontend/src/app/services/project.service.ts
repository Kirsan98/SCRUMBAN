import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { map } from 'rxjs/operators';

@Injectable({  providedIn: 'root'})
export class ProjectService{

  
    constructor(private http:HttpClient){}

    getAllProjects():Observable<any>
    {
        return this.http.get('http://localhost:5000/api/projects/');
    }

    addProject(project: any):Observable<any>{
        return this.http.post("http://localhost:5000/api/addProject/",project);
    }
    
}