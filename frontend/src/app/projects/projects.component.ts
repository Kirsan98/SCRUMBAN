import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

   projects:any[]= [];
  // projects: Project[]= [];

  constructor(
    private router: Router,
    public projectService: ProjectService) { }

   ngOnInit():void{
    this.listProject();
   }

   listProject(): void{
       this.projectService.getAllProjects().subscribe(
       data => {
        this.projects = data['data'];
        console.log(this.projects);
      });
   }

   onProjectClicked(id :string){
     this.router.navigate(['/project/' + id]);
   }

  //  onDelete(){
  //    this.projectService.deleteProject("619a996d8616a2e8d5c083d3").then(
  //      ()=>{
  //       this.router.navigate(['projects']);
  //      }
  //    );
  //  }

}
