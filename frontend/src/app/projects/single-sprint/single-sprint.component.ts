import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Sprint } from 'src/app/models/sprint.model';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Column } from 'src/app/models/column.model';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-single-sprint',
  templateUrl: './single-sprint.component.html',
  styleUrls: ['./single-sprint.component.scss']
})
export class SingleSprintComponent implements OnInit {
  public project!: Project;
  public sprint!: Sprint;
  public errorMessage!: string;
  public sprints!: Sprint[];

  columnsObject: Column[] = [];

  columns: any[] = [];
  connectedTo: any = [];
  refreshProjectService: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private taskService: TaskService
  ) {}

  public loadTask(column: any): any[]{
    const tasks: any[] = [];    
    column._tasks.forEach((element: any) => {
      this.taskService.getTaskById(element)
      .then((task:any) => {
        tasks.push(task.data);
        
      });
    });
    return tasks;
  }

  public loadColumns(columns: any[]){
    let finalColumns: any[] = [];
    columns.forEach((column: any) => {    
      let tasks = this.loadTask(column);
      finalColumns.push(tasks);
    });
    this.columns = finalColumns;
  }
  //   this.columns = [
  //     {
  //       title: 'A faire',
  //       taskList: [
  //         "task 1",
  //         "task 2",
  //         "task 3",
  //         "task 4",
  //         "task 5"
  //       ]
  //     }, {
  //       title: 'En cours',
  //       taskList: []
  //     }, {
  //       title: 'Review',
  //       taskList: []
  //     }, {
  //       title: 'Fini',
  //       taskList: []
  //     }
  //   ];
  //   for (let column of this.columns) {
  //     this.connectedTo.push(column.id);
  //   };
  //}

  ngOnInit(): void {
    let idProject!: string;
    let idSprint!: string;
    this.route.params.subscribe(
      (params: Params) => {
        idSprint = params['idSprint'];
        idProject = params['idProject'];
      }
    );
    this.projectService.getProjectById(idProject)
      .then(
        (project: any) => {
          this.project = project['data'];
        }
      );
    this.projectService.getSingleSprintByProject(idProject, idSprint)
      .then(
        (sprint: any) => {
          this.sprint = sprint['data'];
        }
      );
      
    this.sprintService.getAllColumnFromSprint(idProject, idSprint)
    .then(
      (columns: any) => {
        this.columnsObject = columns.data;
        this.loadColumns(columns.data);
      }
    );
    
    
  }

  drop(event: CdkDragDrop<String[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onDelete() {
    this.router.navigate(['/project/' + this.project._id + '/delete-sprint/' + this.sprint._id]);
  }


  onSprintClicked(idProject: string, idSprint: string) {
    this.router.navigate(['project/' + idProject + '/sprint/' + idSprint]);
    this.projectService.getSingleSprintByProject(idProject, idSprint)
      .then(
        (sprint: any) => {
          this.sprint = sprint['data'];
        }
      );
  }


  addColumnToSprint(){
    const newColumn = new Column();
    newColumn.title = "Column test";
    newColumn.index = 0;
    this.sprintService.addColumn(this.project._id, this.sprint._id, newColumn).then(
      (response: any) => {
        this.sprintService.getAllColumnFromSprint(this.project._id, this.sprint._id).then(
          (columns:any) => {
            this.columnsObject = columns.data;
            this.loadColumns(columns.data);

          }
        )
        this.router.navigate(['project/' + this.project._id + '/sprint/' + this.sprint._id]);
      }
    ).catch((error) => {
      this.errorMessage = error.message;
    });
  }
}
