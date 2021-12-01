import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SprintService } from 'src/app/services/sprint.service';
import { ProjectService } from 'src/app/services/project.service';
import { Sprint } from '../models/sprint.model';
import { Column } from '../models/column.model';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {
  public sprint!: Sprint;
  public columns!: Column[];

  constructor(
    private route: ActivatedRoute,
    private sprintService: SprintService,
    private projectService: ProjectService 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.projectService.getSingleSprintByProject(params.idProject, params.idSprint)
          .then(
            (sprint: any) => {
              this.sprint = sprint['data'];
            }
          );
        this.sprintService.getAllColumnFromSprint(params.idProject, params.idSprint)
          .then(
            (columns: any) => {
              this.columns = columns['data'];
              console.log(this.columns);
            }
          );
      }
    );
  }
}
