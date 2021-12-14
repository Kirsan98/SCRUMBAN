import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class RefreshProjectListService {
  private projectList: BehaviorSubject<String>;
  public currentProjectList;

  constructor() {
    this.projectList = new BehaviorSubject<String>("init");
    this.currentProjectList = this.projectList.asObservable();
  }

  public refreshList(projects: String): void{
    this.projectList.next(projects);
  }
}
