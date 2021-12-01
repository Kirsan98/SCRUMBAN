import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { DeleteProjectComponent } from './projects/delete-project/delete-project.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { NewSprintComponent } from './projects/new-sprint/new-sprint.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { SingleProjectComponent } from './projects/single-project/single-project.component';
import { SingleSprintComponent } from './projects/single-sprint/single-sprint.component';
import { SettingsProjectComponent } from './projects/settings-project/settings-project.component';
import { DeletesprintComponent } from './projects/deleteSprint/deletesprint.component';
import { JoinProjectComponent } from './projects/join-project/join-project.component';
import { SprintsComponent } from './projects/sprints/sprints.component';
import { DetailComponent } from './projects/detail/detail.component';
import { ColumnsComponent } from './columns/columns.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'projects', component: ProjectsComponent },
  {
    path: 'project/:idProject',
    component: SingleProjectComponent,
    children: [
      { path: 'detail', component: DetailComponent },
      { path: 'tasks', component: TasksComponent },
      {
        path: 'sprints',
        component: SprintsComponent,
        children: [
          { path: 'add-sprint', component: NewSprintComponent },
        ]
      },
      { 
      path: 'sprint/:idSprint', 
      component: SingleSprintComponent,
      children: [
        { path: 'columns', component: ColumnsComponent}
      ]
      },
      { path: 'settings', component: SettingsProjectComponent },
      { path: 'delete-sprint/:idSprint', component: DeletesprintComponent },
      { path: 'add-task', component: NewTaskComponent },
      { path: 'delete', component: DeleteProjectComponent },
    ]
  },
  { path: 'new-project', component: NewProjectComponent },
  { path: 'join-project', component: JoinProjectComponent },


  { path: '', pathMatch: 'full', redirectTo: 'accueil' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

