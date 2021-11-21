import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent implements OnInit {
  public project!: Project;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.id).then(
          (project: any) => {
            this.project = project['data'];
          }
          );
        }
      );
  }

  onDelete(){
    this.projectService.deleteProject(this.project._id).then(
      () => {
        this.router.navigate(['projects']);
      }
    )
  }

}
