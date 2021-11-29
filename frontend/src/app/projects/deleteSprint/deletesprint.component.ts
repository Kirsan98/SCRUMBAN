import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Sprint } from 'src/app/models/sprint.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-deletesprint',
  templateUrl: './deletesprint.component.html',
  styleUrls: ['./deletesprint.component.scss']
})
export class DeletesprintComponent implements OnInit {
  public project!: Project;
  public sprint!: Sprint;


  constructor(
    
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.route.parent!.paramMap.subscribe(
      (params: Params) => {
          this.projectService.getProjectById(params.get('idProject')).then(
            (project: any) => {
              this.project = project['data']
            }
          )        
          this.projectService.getSingleSprintByProject(params.get('idProject'),params.get('idSprint')).then(
          (sprint: any) => {
            this.sprint = sprint['data']
          }
          );
        }
      );
  }

  
  onDelete(){
    this.projectService.deleteSingleSprintByProject(this.project._id,this.sprint._id).then(
      () => {
        this.router.navigate(['project/'+this.project._id+'/sprints']);
      }
    )
  }
  
}
