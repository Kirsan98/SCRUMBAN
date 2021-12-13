import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Sprint } from 'src/app/models/sprint.model';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Column } from 'src/app/models/column.model';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { ColumnService } from 'src/app/services/column.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  indexColumn: Number = 0;
  editMode: boolean = false;
  columnHelp!: any;
  updateColumnName !: FormGroup;
  connectedTo: any[] = [];
  columnsObject: Column[] = [];
  columns: any[] = [];
  taskDrag!: Task;
  isTerminated = false;

  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private columnService: ColumnService,
    private taskService: TaskService,
  ) { }

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
          this.columnsObject.forEach((column: any) => {
            this.connectedTo.push(column._id)

          });


        }
      );
    this.updateColumnName = this.formBuilder.group({
      title: [null, Validators.required]
    })


  }

  public loadTask(column: any): any[] {
    const tasks: any[] = [];
    column._tasks.forEach((element: any) => {
      this.taskService.getTaskById(element)
        .then((task: any) => {
          tasks.push(task.data);

        });
    });
    return tasks;
  }

  public loadColumns(columns: any[]) {
    let finalColumns: any[] = [];
    columns.sort(function (a, b) {
      return a.index - b.index;
    });

    columns.forEach((column: any) => {
      let tasks = this.loadTask(column);
      finalColumns.push(tasks);
    });
    this.columns = finalColumns;

  }


  drop(event: CdkDragDrop<String[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const idStartColumn = event.previousContainer.id;
      const idEndColumn = event.container.id;

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log("Avant update",this.columnsObject);
      this.columnsObject.forEach((column: any) => {
        if (column._id == idStartColumn) {
          let task = event.container.data[event.currentIndex] as unknown as Task;
          this.sprintService.moveTaskToColumn(idStartColumn, idEndColumn, task._id);
          this.columnService.getColumnById(idEndColumn).then((column: any) => {
            this.taskService.getTaskById(task._id).then((taskObj: any) => {
              taskObj.data.state = column.data.title;
              this.taskService.updateTask(task._id, taskObj.data);
              event.container.data[event.currentIndex] = taskObj.data;
              console.log("Apres update",this.columnsObject);
              //TODO Modifier columnsObject --> Supprimer l'id de lâ tache columnsObject(idStartColumn) et ajouter l'id de la tâche columnsObject(idEndColumn)
            });
          });
        }
      });
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




  addColumnToSprint() {
    const newColumn = new Column();
    newColumn.title = "Default name";
    //a changer 
    if (this.columns.length >= 10) {
      console.log("Max column");

    }
    else {
      newColumn.index = this.columns.length;
      this.sprintService.addColumn(this.project._id, this.sprint._id, newColumn).then(
        (response: any) => {

          this.sprintService.getAllColumnFromSprint(this.project._id, this.sprint._id).then(
            (columns: any) => {

              this.columnsObject = columns.data;
              this.loadColumns(this.columnsObject);
              this.connectedTo = [];
              this.columnsObject.forEach((column: any) => {
                this.connectedTo.push(column._id)
              });

            }
          )
          this.router.navigate(['project/' + this.project._id + '/sprint/' + this.sprint._id]);
        }
      ).catch((error) => {
        this.errorMessage = error.message;
      });
    }
  }

  get sortColumns() {
    return this.columnsObject.sort((a: { index: any; }, b: { index: any; }) => {
      return <any>new Number(a.index) - <any>new Number(b.index);
    });
  }

  onUpdate(idColumn: any) {
    const columnUpdated = new Column();
    columnUpdated.title = this.updateColumnName.get('title')?.value;
    this.sprintService.updateColumn(idColumn, columnUpdated).then(
      (column: any) => {
        console.log(column);
        column.data._tasks.forEach((taskId:any)=>{
          this.taskService.getTaskById(taskId).then((taskObj:any)=>{
            taskObj.data.state = column.data.title;
            this.taskService.updateTask(taskObj.data._id,taskObj.data);
          });
        });
        this.sprintService.getAllColumnFromSprint(this.project._id, this.sprint._id).then(
          (columns: any) => {

            this.columnsObject = columns.data;
            this.loadColumns(this.columnsObject);

            this.connectedTo = [];
            this.columnsObject.forEach((column: any) => {
              this.connectedTo.push(column._id);
            });
          }
        )
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    )
  }

  openModal(targetModal: any, task: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: true
    });
    this.taskDrag = task;
    console.log(this.taskDrag._logs[0]);

  }

  onSubmit() {
    this.modalService.dismissAll();
  }

  endSprint() {

    this.isTerminated = true;
    this.columnsObject.forEach((column: any) => {
      if (column.title != "Terminado") {
        column._tasks.forEach((taskId: any) => {
          this.taskService.getTaskById(taskId).then((task: any) => {
            task.data.state = "UNDEFINED";
            console.log("column", column);
            this.taskService.updateTask(taskId, task.data).then(
              (success) => {
                console.log("Dans endSprint",success);
              }
            ).catch(
              (error) => {
                this.errorMessage = error.message;
              }
            );
          });
        });
      }
    });
    this.router.navigate(['/project/' + this.project._id + '/sprints/']);
  }
}