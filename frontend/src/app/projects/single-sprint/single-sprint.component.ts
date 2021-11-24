import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Sprint } from 'src/app/models/sprint.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-single-sprint',
  templateUrl: './single-sprint.component.html',
  styleUrls: ['./single-sprint.component.scss']
})
export class SingleSprintComponent implements OnInit {
  public sprint!: Sprint;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe(
        (params: Params) => {
            this.projectService.getSingleSprintByProject(params.get('id1'),params.get('id2')).then(
            (sprint: any) => {
              this.sprint = sprint['data']
              console.log(this.sprint.title)
            }
            );
          }
        );
    }

}
