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

  todo = [
    'Tache 1',
    'Tache 2',
    'Tache 3',
    'Tache 4'
  ];

  done = [
    'Tache 5'
  ];

  review = [
    'Tache 6',
  ];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

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
