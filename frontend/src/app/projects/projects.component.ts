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

   projects!:Project[];

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
      });
   }

   onProjectClicked(idProject :string){
     this.router.navigate(['/project/' + idProject+'/detail']);
   }

   onDelete(idProject: string){
    this.router.navigate(['/project/' + idProject+'/delete']);
   }

   onUpdate(idProject: string){
    this.router.navigate(['/project/' + idProject+'/settings']); 
   }
}
