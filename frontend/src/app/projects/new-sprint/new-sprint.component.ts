import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  public project!: Project;
  public tasksProject!: Task[];

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private router: Router,
    private route: ActivatedRoute,
    private refreshProjectService: RefreshProjectService

  ) {
    this.form = this.formBuilder.group({
      orders: new FormArray([])
    });
  }

  private addCheckboxesToForm() {
    this.tasksProject.forEach(
      (element: any) => {
        this.ordersFormArray.push(new FormControl(false));
      });
  }

  get ordersFormArray() {
    return this.form.controls.orders as FormArray;
  }

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
            this.projectService.getAllTaskFromProject(this.project._id)
              .then(
                (taskListData: any) => {
                  this.tasksProject = taskListData.data;
                  this.addCheckboxesToForm();
                }
              );
          }
        );

      }
    );


  }
  public loadSprint(): Sprint {
    const sprint = new Sprint();
    sprint.title = this.sprintForm.get('title')?.value;
    sprint.start_at = this.sprintForm.get('start_at')?.value;
    sprint.end_at = this.sprintForm.get('end_at')?.value;
    sprint.planningDaily = this.sprintForm.get('planningDaily')?.value;
    sprint.sprintRetrospective = this.sprintForm.get('sprintRetrospective')?.value;
    this.sprintForm.reset();
    return sprint;
  }

  public loadAllTask(): String[] {
    const tasks: String[] = [];
    const elements = this.form.value['orders'];
    for (let i = 0; i < this.tasksProject.length; i++) {
      if (elements[i] == true) {
        tasks.push(this.tasksProject[i]._id);
      }
    }
    return tasks;
  }

  onSubmit() {
    const list = this.loadAllTask();
    const sprint = this.loadSprint()
    this.projectService.addSprint(this.project._id, sprint).then(
      (response: any) => {
        //premiere colonne
        const sprintBacklogCol = new Column();
        sprintBacklogCol.title = "Sprint Backlog";
        sprintBacklogCol.index = 0;
        sprintBacklogCol._tasks = this.loadAllTask();
        this.sprintService.addColumn(this.project._id, response.data.sprint._id, sprintBacklogCol).then(
          () => {
            this.refreshProjectService.refreshProject(response.data.project);
            //derniere colonne
            const finishedCol = new Column();
            finishedCol.title = "Finished";
            finishedCol.index = 10;
            this.sprintService.addColumn(this.project._id, response.data.sprint._id, finishedCol).then(
              () => {
                this.refreshProjectService.refreshProject(response.data.project);
                this.router.navigate(['project/' + this.project._id + '/sprint/' + response.data.sprint._id]);
              }
            ).catch((error) => {
              this.errorMessage = error.message;
            });
            // this.router.navigate(['project/' + this.project._id + '/sprint/' + response.data.sprint._id]);
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
