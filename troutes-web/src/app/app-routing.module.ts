import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {  path: 'account', component: AccountComponent, children: [
    { path: 'login', component: LoginComponent }]},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
