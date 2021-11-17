import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {path: 'accueil',component: AccueilComponent},
  {path: 'projects',component: ProjectsComponent},
  { path: '', pathMatch: 'full', redirectTo: 'accueil' },
  { path: '**', redirectTo: 'accueil' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

