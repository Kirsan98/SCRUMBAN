import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Sprint } from 'src/app/models/sprint.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.scss']
})
export class NewSprintComponent implements OnInit {
  public sprintForm !: FormGroup;
  public errorMessage!: string;
  public projectID!: string;


  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.sprintForm = this.formBuilder.group({
      title: [null,Validators.required]
    });
    this.route.params.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.id).then(
          (project: any) => {
            this.projectID = project['data']._id;
          }
          );
        }
      );
  }

  onSubmit(){
    const sprint = new Sprint();
    sprint.title = this.sprintForm.get('title')?.value;
    this.projectService.addSprint(this.projectID,sprint).then(
      ()=>{
        this.sprintForm.reset();
        this.router.navigate(['project/'+this.projectID+'/sprints']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    )
  }

}
