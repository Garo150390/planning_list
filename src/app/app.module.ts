import { NgModule } from '@angular/core';
import { DateFnsModule } from 'ngx-date-fns';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PlanningListComponent } from './components/planning-list/planning-list.component';
import { PlanningFormComponent } from './components/planning-form/planning-form.component';
import { PlanningListService } from './core/services/planning-list.service';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    PlanningListComponent,
    PlanningFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    CoreModule,
    DateFnsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PlanningListService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
