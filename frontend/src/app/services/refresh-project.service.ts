import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class RefreshProjectService {
  private projectSrc: BehaviorSubject<Project>;
  public currentProject;

  

  constructor() { 
    this.projectSrc = new BehaviorSubject<Project>(new Project());
    this.currentProject = this.projectSrc.asObservable();
  }

  public refreshProject(project:Project):void{
    this.projectSrc.next(project);
  }

}
