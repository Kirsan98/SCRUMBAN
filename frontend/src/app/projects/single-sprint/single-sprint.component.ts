import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Sprint } from 'src/app/models/sprint.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-single-sprint',
  templateUrl: './single-sprint.component.html',
  styleUrls: ['./single-sprint.component.scss']
})
export class SingleSprintComponent implements OnInit {
  public project!: Project;
  public sprint!: Sprint;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe(
        (params: Params) => {
            this.projectService.getProjectById(params.get('id1')).then(
              (project: any) => {
                this.project = project['data']
              }
            )        
            this.projectService.getSingleSprintByProject(params.get('id1'),params.get('id2')).then(
            (sprint: any) => {
              this.sprint = sprint['data']
            }
            );
          }
        );
    }

    onDelete(){
      this.router.navigate(['/project/' + this.project._id+'/delete-sprint/'+this.sprint._id]);
     }

 
}
