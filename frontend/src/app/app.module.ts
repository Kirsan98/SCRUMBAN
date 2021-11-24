import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectService } from './services/project.service';
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
    SettingsProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ProjectService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
