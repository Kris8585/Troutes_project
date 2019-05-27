import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { RegisterComponent } from './components/register/register.component';
import { SecureComponent } from './components/secure/secure.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceComponent } from './components/service/service.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailsComponent } from './components/details/details.component';
import { AttractionAdminComponent } from './components/attraction-admin/attraction-admin.component';
import { NewsAdminComponent } from './components/news-admin/news-admin.component';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { AuthorizationGuard } from './guards/authorization/authorization.guard';
import { NewsComponent } from './components/news/news.component';

const routes: Routes = [


  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'service', component: ServiceComponent },
  {
    path: 'account', component: AccountComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'recovery', component: RecoveryComponent },
    ]
  },
  //canActivate:[AuthenticationGuard], 
  {
    path: 'secure', component: SecureComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'news/:newId', component: NewsComponent },
      { path: 'details/:attractionName', component: DetailsComponent },
      {
        path: 'details/:atrractionName/attraction-admin', component: AttractionAdminComponent,
        canActivate: [AuthorizationGuard], data: { role: 'Editor' }
      },
      { path: 'news-admin/:newsId', component: NewsAdminComponent },
      { path: 'profile/:userId', component: ProfileComponent }
    ]
  },

  { path: '**', pathMatch: 'full', redirectTo: 'secure/home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
