import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Sprint } from 'src/app/models/sprint.model';
import { ProjectService } from 'src/app/services/project.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-single-sprint',
  templateUrl: './single-sprint.component.html',
  styleUrls: ['./single-sprint.component.scss']
})
export class SingleSprintComponent implements OnInit {
  public project!: Project;
  public sprint!: Sprint;
  public sprints!: Sprint[];

  columns:any  = [];
  connectedTo:any = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.columns = [
      {
        id:'A faire',
        taskList:[
          "task 1",
          "task 2",
          "task 3",
          "task 4",
          "task 5"
        ]
      },{
        id:'En cours',
        taskList:[]
      },{
        id:'Review',
        taskList:[]
      },{
        id:'Fini',
        taskList:[]
      }
    ];
    for (let column of this.columns) {
      this.connectedTo.push(column.id);
    };
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(
        (params: Params) => {
            this.projectService.getProjectById(params.get('id1')).then(
              (project: any) => {
                this.project = project['data']
                this.sprints = this.project.sprints;
              }
            )        
            this.projectService.getSingleSprintByProject(params.get('id1'),params.get('id2')).then(
            (sprint: any) => {
              this.sprint = sprint['data']
            }
            );
          }
        );
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

    onDelete(){
      this.router.navigate(['/project/' + this.project._id+'/delete-sprint/'+this.sprint._id]);
     }

       
  onSprintClicked(id1: string, id2: string){
    this.router.navigate(['project/'+id1+'/sprint/'+id2]);
  }


 
}
