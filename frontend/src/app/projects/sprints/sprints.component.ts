import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Sprint } from 'src/app/models/sprint.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {
  public project!: Project;
  public sprints!: Sprint[];



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.id).then(
          (project: any) => {
            this.project = project['data'];
            this.sprints = this.project.sprints;
          }
          );
        }
      );
  }

  
  onSprintClicked(id1: string, id2: string){
    this.router.navigate(['project/'+id1+'/sprint/'+id2]);
  }

}
