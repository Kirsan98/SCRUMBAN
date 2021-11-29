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
  public sprintSelected!: Sprint;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.route.parent!.params.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.idProject).then(
          (project: any) => {
            this.project = project['data'];
            this.sprints = this.project.sprints;
          }
        );
      }
    );
  }


  onSprintClicked(idProject: string, idSprint: string) {
    this.projectService.getSingleSprintByProject(idProject, idSprint)
    .then(
      (sprint: any) => {
        this.sprintSelected = sprint;
      }
    );
    // console.log(this.sprintSelected);
    this.router.navigate(['project/' + idProject + '/sprints/sprint/' + idSprint]);
  }
}
