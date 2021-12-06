import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { RefreshProjectService } from 'src/app/services/refresh-project.service';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.scss']
})
export class SingleProjectComponent implements OnInit {
  public project!: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private refreshProjectService: RefreshProjectService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      async (params: Params) => {
        this.projectService.getProjectById(params.idProject).then(
          (project: any) => {
            this.project = project['data'];
          }
        );
      }
    );
    this.refreshProjectService.currentProject.subscribe(
      (newProject: Project) => {
        this.project = newProject;
      }
    );
  }
}
