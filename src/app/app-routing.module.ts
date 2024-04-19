import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { LoginComponent } from './login/login.component';
import { activateGuard } from './activate.guard';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "list", canActivate:[activateGuard] ,component: ReservationListComponent, children: [
    {path: ':username', component: ReservationListComponent}
  ]},
  {path: "new", canActivate:[activateGuard] , component: ReservationFormComponent},
  {path: "edit/:id", canActivate:[activateGuard] , component: ReservationFormComponent},
  {path: "404NotFound", component: ErrorPageComponent},
  {path: "**", redirectTo: "404NotFound"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
