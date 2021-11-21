import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { SingleProjectComponent } from './projects/single-project/single-project.component';

const routes: Routes = [
  {path: 'accueil',component: AccueilComponent},
  {path: 'projects',component: ProjectsComponent},
  {path: 'project/:id', component: SingleProjectComponent},
  {path: 'newProject', component: NewProjectComponent},
  { path: '', pathMatch: 'full', redirectTo: 'accueil' },
  { path: '**', redirectTo: 'accueil' }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

