import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';


//TODO 
// checker si le input rentrer et le meme que le titre du projet
// si oui alors on delete le projet 
// si non alors ...


@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent implements OnInit {
  public project!: Project;
  public deleteProjectForm !: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
 
    this.route.parent!.params.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.idProject).then(
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
