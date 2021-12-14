import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RefreshProjectListService } from '../services/refresh-project-list.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects!: Project[];

  constructor(
    private router: Router,
    public projectService: ProjectService,
    private authService: AuthService,
    private refreshList: RefreshProjectListService
  ) { }

  ngOnInit(): void {
    this.refreshList.currentProjectList.subscribe(
      (state) => {
        if(state != "init")
          this.listProject();
      }
    );
    this.listProject();
  }

  listProject(): void {
    const userId = this.authService.getUserId;
    this.projectService.getAllProjectsFromUser(userId).then(
      (response: any) => {
        this.projects = response.data;
      }
    );
  }

  onProjectClicked(idProject: string) {
    this.router.navigate(['/project/' + idProject + '/detail']);
  }

  onDelete(idProject: string) {
    this.router.navigate(['/project/' + idProject + '/delete']);
  }

  onUpdate(idProject: string) {
    this.router.navigate(['/project/' + idProject + '/settings']);
  }

  get sortProject() {
    return this.projects.sort((a, b) => {
      return <any>new Date(b.created_at) - <any>new Date(a.created_at);
    });
  }
}
