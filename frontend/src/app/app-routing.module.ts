import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { DeleteProjectComponent } from './projects/delete-project/delete-project.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { NewSprintComponent } from './projects/new-sprint/new-sprint.component';
import { ProjectsComponent } from './projects/projects.component';
import { SingleProjectComponent } from './projects/single-project/single-project.component';
import { SingleSprintComponent } from './projects/single-sprint/single-sprint.component';

const routes: Routes = [
  {path: 'accueil',component: AccueilComponent},
  {path: 'projects',component: ProjectsComponent},
  {path: 'project/:id', component: SingleProjectComponent},
  {path: 'deleteProject/:id', component: DeleteProjectComponent},
  {path: 'newProject', component: NewProjectComponent},
  {path: 'newSprint/:id', component: NewSprintComponent},
  {path: 'project/:id1/sprint/:id2', component: SingleSprintComponent},

  { path: '', pathMatch: 'full', redirectTo: 'accueil' },
  { path: '**', redirectTo: 'accueil' }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

