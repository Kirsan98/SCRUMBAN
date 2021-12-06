import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RefreshProjectService } from 'src/app/services/refresh-project.service';

@Component({
  selector: 'app-settings-project',
  templateUrl: './settings-project.component.html',
  styleUrls: ['./settings-project.component.scss']
})
export class SettingsProjectComponent implements OnInit {
  public project !: Project;
  public updateProjectForm !: FormGroup;
  public errorMessage !: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private refreshProjectService: RefreshProjectService
  ) { }

  ngOnInit(){
    this.updateProjectForm = this.formBuilder.group({
      title: [null,Validators.required]
    })

    this.route.params.subscribe(
      (params) => {
        this.projectService.getProjectById(params.idProject).then(
          (project: any) => {
            this.project = project['data'];
            this.updateProjectForm.get('title')?.setValue(this.project.title);
          }
        );
      }
    );
  }

  onSubmit(){
    const projectUpdated = new Project();
    projectUpdated.title = this.updateProjectForm.get('title')?.value;
    this.projectService.updateProject(this.project._id, projectUpdated).then(
      (newProj: any) => {
        this.updateProjectForm.reset();
        this.refreshProjectService.refreshProject(newProj.data);
        this.router.navigate(['project/'+this.project._id+'/detail']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    )
  }
}
