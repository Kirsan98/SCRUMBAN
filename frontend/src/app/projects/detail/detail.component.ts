import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public project!: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.route.parent!.paramMap.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.get('idProject'))
        .then(
          (project: any) => {
            this.project = project['data'];
          }
        );
      }
    );
  }

}
