import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Sprint } from 'src/app/models/sprint.model';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-single-sprint',
  templateUrl: './single-sprint.component.html',
  styleUrls: ['./single-sprint.component.scss']
})
export class SingleSprintComponent implements OnInit {
  public project!: Project;
  public sprint!: Sprint;
  public sprints!: Sprint[];

  columns: any = [];
  connectedTo: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private sprintService: SprintService,

  ) {
    //this.columns = [
    //   {
    //     id: 'A faire',
    //     taskList: [
    //       "task 1",
    //       "task 2",
    //       "task 3",
    //       "task 4",
    //       "task 5"
    //     ]
    //   }, {
    //     id: 'En cours',
    //     taskList: []
    //   }, {
    //     id: 'Review',
    //     taskList: []
    //   }, {
    //     id: 'Fini',
    //     taskList: []
    //   }
    // ];
    // for (let column of this.columns) {
    //   this.connectedTo.push(column.id);
    // };
  }

  ngOnInit(): void {
    console.log("on init");
    
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
          this.sprints = this.project.sprints;
        }
      );
    this.projectService.getSingleSprintByProject(idProject, idSprint)
      .then(
        (sprint: any) => {
          this.sprint = sprint['data'];
        }
      );
      console.log("avant de recup les colonnes");
      
    this.sprintService.getAllColumnFromSprint(idProject, idSprint)
    .then(
      (columns: any) => {
        this.columns = columns.data;
        console.log("testttttttt");
        
      }
    );
    console.log("apres recup colonne");
    
    
  }
  ngOnChanges(changes: SimpleChange) {
    console.log("on change de sprint");
  }

  drop(event: CdkDragDrop<string[]>) {
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

}
