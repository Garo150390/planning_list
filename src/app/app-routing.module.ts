import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanningListComponent } from './components/planning-list/planning-list.component';

const routes: Routes = [
  {
    path: '',
    component: PlanningListComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
