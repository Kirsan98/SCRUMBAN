import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Sprint } from 'src/app/models/sprint.model';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Column } from 'src/app/models/column.model';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { ColumnService } from 'src/app/services/column.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { RefreshLogService } from 'src/app/services/refresh-log.service';

@Component({
  selector: 'app-single-sprint',
  templateUrl: './single-sprint.component.html',
  styleUrls: ['./single-sprint.component.scss'],
})
export class SingleSprintComponent implements OnInit {
  public project!: Project;
  public sprint!: Sprint;
  public errorMessage!: string;
  public sprints!: Sprint[];
  private userId!: String;
  indexColumn: Number = 0;
  editMode: boolean = false;
  columnHelp!: any;
  updateColumnName!: FormGroup;
  connectedTo: any[] = [];
  columnsObject: Column[] = [];
  columns: any[] = [];
  taskDrag!: Task;
  logTaskDrag: Log[] = [];
  logTaskDragSort: Log[] = [];
  userLog: User[] = [];
  isTerminated = false;

  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private logService: LogService,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private columnService: ColumnService,
    private taskService: TaskService,
    private authService: AuthService,
    private userService: UserService,
    private refreshLogService: RefreshLogService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId;
    let idProject!: string;
    let idSprint!: string;
    this.route.params.subscribe((params: Params) => {
      idSprint = params['idSprint'];
      idProject = params['idProject'];
    });
    this.projectService.getProjectById(idProject)
      .then((project: any) => {
        this.project = project['data'];
      });
    this.projectService
      .getSingleSprintByProject(idProject, idSprint)
      .then((sprint: any) => {
        this.sprint = sprint['data'];
      });
    this.sprintService
      .getAllColumnFromSprint(idProject, idSprint)
      .then((columns: any) => {
        this.columnsObject = columns.data;
        this.loadColumns(columns.data);
        this.columnsObject.forEach((column: any) => {
          this.connectedTo.push(column._id);
        });
      });
    this.updateColumnName = this.formBuilder.group({
      title: [null, Validators.required],
    });
    this.refreshLogService.currentLogList.subscribe(
      () => {
        this.userLog = this.refreshLogService.getUsers();
        console.log(this.userLog, "on vient de charger le log from single sprint");

      }
    );
  }

  public loadTask(column: any): any[] {
    const tasks: any[] = [];
    column._tasks.forEach((element: any) => {
      this.taskService.getTaskById(element).then((task: any) => {
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

  /**
   * Remove a task id from this columnsObject which as an array of objects which represents our columns.
   * These columns contains an array of task id.
   * @param task
   */
  removeTaskIdFromColumnsObject(task: Task, columnId: String) {
    this.columnsObject.forEach((column: any) => {
      if (column._id == columnId) {
        column._tasks.forEach((taskId: any, index: Number) => {
          if (taskId == task._id) column._tasks.splice(index, 1);
        });
      }
    });
  }

  drop(event: CdkDragDrop<String[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const idStartColumn = event.previousContainer.id;
      const idEndColumn = event.container.id;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.columnsObject.forEach((column: any, index) => {
        let task = event.container.data[event.currentIndex] as unknown as Task;
        if (column._id == idStartColumn) {
          this.removeTaskIdFromColumnsObject(task, idStartColumn);

          this.sprintService.moveTaskToColumn(idStartColumn, idEndColumn, task._id, this.userId)
            .then((data: any) => {
              this.columnService.getColumnById(idEndColumn)
                .then((column: any) => {
                  this.taskService.getTaskById(task._id)
                    .then((taskObj: any) => {
                      taskObj.data.state = column.data.title;
                      this.taskService.updateTask(task._id, taskObj.data);
                      event.container.data[event.currentIndex] = taskObj.data;
                    });
                });
            });
        }
        if (column._id == idEndColumn) {
          column._tasks.push(task._id);
        }
      });
    }
  }

  onDelete() {
    this.router.navigate([
      '/project/' + this.project._id + '/delete-sprint/' + this.sprint._id,
    ]);
  }

  onSprintClicked(idProject: string, idSprint: string) {
    this.router.navigate(['project/' + idProject + '/sprint/' + idSprint]);
    this.projectService
      .getSingleSprintByProject(idProject, idSprint)
      .then((sprint: any) => {
        this.sprint = sprint['data'];
      });
  }

  addColumnToSprint() {
    const newColumn = new Column();
    newColumn.title = 'Default name';
    if (this.columns.length >= 10) {
      alert('Le nombre maximum de colonne est 10');
    } else {
      newColumn.index = this.columns.length;
      this.sprintService
        .addColumn(this.project._id, this.sprint._id, newColumn)
        .then((response: any) => {
          this.sprintService
            .getAllColumnFromSprint(this.project._id, this.sprint._id)
            .then((columns: any) => {
              this.columnsObject = columns.data;
              this.loadColumns(this.columnsObject);

              this.connectedTo = [];
              this.columnsObject.forEach((column: any) => {
                this.connectedTo.push(column._id);
              });
            });
          this.router.navigate([
            'project/' + this.project._id + '/sprint/' + this.sprint._id,
          ]);
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }
  }

  get sortColumns() {
    return this.columnsObject.sort((a: { index: any }, b: { index: any }) => {
      return <any>new Number(a.index) - <any>new Number(b.index);
    });
  }

  onUpdate(idColumn: any) {
    const columnUpdated = new Column();
    columnUpdated.title = this.updateColumnName.get('title')?.value;
    this.sprintService.updateColumn(idColumn, columnUpdated)
      .then((column: any) => {
        column.data._tasks.forEach((taskId: any) => {
          this.taskService.getTaskById(taskId).then((taskObj: any) => {
            taskObj.data.state = column.data.title;
            this.taskService.updateTask(taskObj.data._id, taskObj.data);
          });
        });
        this.sprintService.getAllColumnFromSprint(this.project._id, this.sprint._id)
          .then((columns: any) => {
            this.columnsObject = columns.data;
            this.loadColumns(this.columnsObject);

            this.connectedTo = [];
            this.columnsObject.forEach((column: any) => {
              this.connectedTo.push(column._id);
            });
          });
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  openModal(targetModal: any, task: Task) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: true,
    });
    this.taskDrag = task;
    this.logTaskDrag = [];
    for (let i = 0; i < this.taskDrag._logs.length; i++) {
      this.logService.getLogById(this.taskDrag._logs[i])
        .then(
          (log: any) => {
            this.columnService.getColumnById(log.data._columnIdStart)
              .then(
                (columnStart: any) => {
                  this.columnService.getColumnById(log.data._columnIdEnd)
                    .then(
                      (columnEnd: any) => {
                        let logWithNameOfColumn = [];
                        logWithNameOfColumn = log.data;
                        logWithNameOfColumn._columnIdStart = columnStart.data.title;
                        logWithNameOfColumn._columnIdEnd = columnEnd.data.title;
                        this.logTaskDrag.push(logWithNameOfColumn);
                        if (i == this.taskDrag._logs.length - 1) {
                          this.refreshLogService.refreshLog(this.logTaskDrag).then(
                            () => {
                              console.log(this.refreshLogService.getUsers(), "voila les users qu'on charge dans single sprint");
                              console.log(this.logTaskDrag.length, "taille du tableau sans couilles cette fois");
                            }
                          );
                        }
                        // console.log(this.logTaskDrag.length, "taille du tableau sans couilles cette fois");
                      });
                });
          });
    }

    // this.refreshLogService.refreshLog(this.logTaskDrag);
    // .then(
    //   (log) => {
    //     console.log();

    //     this.userLog = this.refreshLogService.getUsers();
    //     console.log("on a bien chargé les users ", this.userLog);

    //   }
    // );
  }

  onSubmit() {
    this.modalService.dismissAll();
  }

  endSprint() {
    this.isTerminated = true;
    this.columnsObject.forEach((column: any) => {
      if (column.title != 'Terminado') {
        column._tasks.forEach((taskId: any) => {
          this.taskService.getTaskById(taskId).then((task: any) => {
            task.data.state = 'UNDEFINED';
            this.taskService.updateTask(taskId, task.data)
              .then((success) => {
                console.log('Dans endSprint', success);
                // TODO : Afficher un message de succès comme quoi le sprint à bien était terminé
              })
              .catch((error) => {
                this.errorMessage = error.message;
              });
          });
        });
      }
      this.router.navigate(['/project/' + this.project._id + '/sprints/']);
    });
  }

  // async loadUserLog() {
  //   this.userLog = [];
  //   await Promise.all(this.logTaskDragSort.map(
  //     (log: any) => {
  //       this.userService.getUserById(log._userId).then(
  //         (user: any) => {
  //           this.userLog.push(user);
  //         }
  //       );
  //     }
  //   ));
  // }

  get sortLog() {
    this.logTaskDragSort = this.logTaskDrag.sort((a, b) => {
      return <any>new Date(b.updated_at) - <any>new Date(a.updated_at);
    });
    // await Promise.all(this.logTaskDragSort.map(
    //   async (log: any) => {
    //     await this.userService.getUserById(log._userId)
    //     .then(
    //       (user: any) => {
    //         this.userLogTask.push(user.data);
    //       }
    //     );
    //   }
    // ));
    return this.logTaskDragSort;
  }
}
