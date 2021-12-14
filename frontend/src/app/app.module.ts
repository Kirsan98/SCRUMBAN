import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectService } from './services/project.service';
import { SprintService } from './services/sprint.service';
import { UserService } from './services/user.service';
import { RefreshProjectService } from './services/refresh-project.service';
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

import { DeletesprintComponent } from './projects/deleteSprint/deletesprint.component';
import { JoinProjectComponent } from './projects/join-project/join-project.component';

import { SprintsComponent } from './projects/sprints/sprints.component';
import { ColumnsComponent } from './columns/columns.component';

import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { DeleteTaskComponent } from './tasks/delete-task/delete-task.component';
import { SingleTaskComponent } from './tasks/single-task/single-task.component';
import { UpdateTaskComponent } from './tasks/update-task/update-task.component';
import { TaskService } from './services/task.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LogsComponent } from './logs/logs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RefreshProjectListService } from './services/refresh-project-list.service';
import { DetailComponent } from './projects/detail/detail.component';

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
    ColumnsComponent,
    DeleteTaskComponent,
    SingleTaskComponent,
    UpdateTaskComponent,
    LoginComponent,
    SignupComponent,
    LogsComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    NgbModule
  ],
  providers: [
    ProjectService,
    SprintService,
    UserService, 
    TaskService,
    RefreshProjectService,
    RefreshProjectListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
