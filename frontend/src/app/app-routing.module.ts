import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { DeleteProjectComponent } from './projects/delete-project/delete-project.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { NewSprintComponent } from './projects/new-sprint/new-sprint.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { SingleProjectComponent } from './projects/single-project/single-project.component';
import { SingleSprintComponent } from './projects/single-sprint/single-sprint.component';
import { SettingsProjectComponent } from './projects/settings-project/settings-project.component';
import { DeletesprintComponent } from './projects/deleteSprint/deletesprint.component';
import { JoinProjectComponent } from './projects/join-project/join-project.component';
import { SprintsComponent } from './projects/sprints/sprints.component';
import { DetailComponent } from './projects/detail/detail.component';

const routes: Routes = [
  {path: 'accueil',component: AccueilComponent},
  {path: 'projects',component: ProjectsComponent},
  {
    path: 'project/:id',
    component: SingleProjectComponent,
    children: [
      {path: 'detail', component: DetailComponent},
      {path: 'tasks',component: TasksComponent},
      {path: 'settings', component: SettingsProjectComponent},
      {path: 'delete', component: DeleteProjectComponent},
      {path: 'new-sprint', component: NewSprintComponent},
      {path: 'sprint/:id2', component: SingleSprintComponent},
      {path: 'delete-sprint/:id2', component: DeletesprintComponent},
      {path: 'sprints', component: SprintsComponent},
    ]
  },
  {path: 'new-project', component: NewProjectComponent},
  {path: 'join-project', component: JoinProjectComponent},


  { path: '', pathMatch: 'full', redirectTo: 'accueil' },
  { path: '**', redirectTo: 'accueil' }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

