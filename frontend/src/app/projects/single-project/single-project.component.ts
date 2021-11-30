import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Sprint } from 'src/app/models/sprint.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.scss']
})
export class SingleProjectComponent implements OnInit {
  public project!: Project;
  public sprints!: Sprint[];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(
        async (params: Params) => {
          this.projectService.getProjectById(params.idProject).then(
            (project: any) => {
              this.project = project['data'];
              this.sprints = this.project.sprints;
            }
          );
        }
      );
  }


  onDelete() {
    this.router.navigate(['/delete-project/' + this.project._id]);
  }

  onUpdate() {
    this.router.navigate(['/project/' + this.project._id + '/settings']);
  }
}
