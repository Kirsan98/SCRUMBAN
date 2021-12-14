import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public project!: Project;
  public members!: User[];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.parent!.paramMap.subscribe(
      (params: Params) => {
        this.projectService.getProjectById(params.get('idProject'))
        .then(
          (project: any) => {
            this.project = project['data'];  
            this.loadMembers();         
          }
        );
      }
    );
  }

  loadMembers() {
    this.members = [];
    this.project._members.forEach(
      (memberId) => {
        this.userService.getUserById(memberId).then(
          (userData: any) => {
            this.members.push(userData.data);
          }
        );
      }
    );
  }

}
