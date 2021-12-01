import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectService } from './services/project.service';
import { SprintService } from './services/sprint.service';
import { UserService } from './services/user.service';
import { AccueilComponent } from './accueil/accueil.component';
import { ProjectsComponent } from './projects/projects.component';
import { HttpClientModule } from '@angular/common/http';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleProjectComponent } from './projects/single-project/single-project.component';
import { DeleteProjectComponent } from './projects/delete-project/delete-project.component';
import { NewSprintComponent } from './projects/new-sprint/new-sprint.component';
import { SingleSprintComponent } from './projects/single-sprint/single-sprint.component';
import { SettingsProjectComponent } from './projects/settings-project/settings-project.component';
import { TasksComponent } from './tasks/tasks.component';
import { DeletesprintComponent } from './projects/deleteSprint/deletesprint.component';
import { JoinProjectComponent } from './projects/join-project/join-project.component';
import { SprintsComponent } from './projects/sprints/sprints.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { ColumnsComponent } from './columns/columns.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccueilComponent,
    ProjectsComponent,
    NewProjectComponent,
    SingleProjectComponent,
    DeleteProjectComponent,
    NewSprintComponent,
    SingleSprintComponent,
    SettingsProjectComponent,
    TasksComponent,
    DeletesprintComponent,
    JoinProjectComponent,
    SprintsComponent,
    NewTaskComponent,
    ColumnsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [
    ProjectService,
    SprintService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
