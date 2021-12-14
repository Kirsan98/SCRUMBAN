import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Sprint } from 'src/app/models/sprint.model';
import { ProjectService } from 'src/app/services/project.service';
import { RefreshProjectService } from 'src/app/services/refresh-project.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {
  public project!: Project;
  public sprints!: Sprint[];
  public sprintSelected!: Sprint;

  private idProject!: String;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private refreshProjectService: RefreshProjectService
  ) { }

  ngOnInit(): void {
    this.route.parent!.params.subscribe(
      (params: Params) => {
        this.idProject = params.idProject;
        this.projectService.getAllSprintByProject(params.idProject)
          .then(
            (sprints: any) => {
              this.sprints = sprints['data'];
            }
          );
        this.projectService.getProjectById(params.idProject)
          .then(
            (project: any) => {
              this.project = project['data'];
            }
          );
      }
    );
    this.refreshProjectService.currentProject.subscribe(
      (newProject: Project) => {
        if (this.idProject == newProject._id) {
          this.project = newProject;

          if (this.project._id != undefined)
            this.projectService.getAllSprintByProject(this.project._id)
              .then(
                (sprints: any) => {
                  this.sprints = sprints['data'];
                }
              );
        }
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
    this.router.navigate(['project/' + idProject + '/sprint/' + idSprint]);
  }

  get sortSprint(){
    return this.sprints.sort((a,b) => {
      return <any>new Date(b.start_at) - <any> new Date(a.start_at);
    });
  }

  
}
