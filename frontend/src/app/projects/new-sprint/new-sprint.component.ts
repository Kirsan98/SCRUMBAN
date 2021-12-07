import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Column } from 'src/app/models/column.model';
import { Project } from 'src/app/models/project.model';
import { Sprint } from 'src/app/models/sprint.model';
import { Task } from 'src/app/models/task.model';
import { ProjectService } from 'src/app/services/project.service';
import { RefreshProjectService } from 'src/app/services/refresh-project.service';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: 'app-new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.scss']
})
export class NewSprintComponent implements OnInit {
  public sprintForm !: FormGroup;
  public errorMessage!: string;
  public projectID!: string;
  public project!: Project;
  public tasksProject!: Task[];


  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private router: Router,
    private route: ActivatedRoute,
    private refreshProjectService: RefreshProjectService

  ) { }

  ngOnInit(): void {
    this.sprintForm = this.formBuilder.group({
      title: [null, Validators.required],
      start_at: [null, Validators.required],
      end_at: [null, Validators.required],
      planningDaily: [null, Validators.required],
      sprintRetrospective: [null, Validators.required]
    });
    this.route.parent!.params.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.idProject).then(
          (project: any) => {
            this.project = project['data'];
            this.projectID = project['data']._id;
            this.projectService.getAllTaskFromProject(this.projectID)
              .then(
                (taskListData: any) => {
                  this.tasksProject = taskListData.data;
                }
              );
          }
        );

      }
    );
  }

  onSubmit() {
    const sprint = new Sprint();
    sprint.title = this.sprintForm.get('title')?.value;
    sprint.start_at = this.sprintForm.get('start_at')?.value;
    sprint.end_at = this.sprintForm.get('end_at')?.value;
    sprint.planningDaily = this.sprintForm.get('planningDaily')?.value;
    sprint.sprintRetrospective = this.sprintForm.get('sprintRetrospective')?.value;
    this.projectService.addSprint(this.projectID, sprint).then(
      (response: any) => {
        const columnInit = new Column();
        columnInit.title = "Sprint Backlog";
        columnInit.index = 0;
        this.sprintForm.reset();
        console.log(response.data);
        this.sprintService.addColumn(this.projectID, response.data.sprint._id, columnInit).then(
          () => {
            console.log("column ajoutée correctement");
            this.refreshProjectService.refreshProject(response.data.project);
        this.router.navigate(['project/' + this.projectID + '/sprint/' + response.data.sprint._id]);
          }
        ).catch((error) => {
          this.errorMessage = error.message;
        });
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    )
  }

}
