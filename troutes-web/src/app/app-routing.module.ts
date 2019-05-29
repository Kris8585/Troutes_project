import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { SecureComponent } from './components/secure/secure.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceComponent } from './components/service/service.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailsComponent } from './components/details/details.component';
import { AttractionAdminComponent } from './components/attraction-admin/attraction-admin.component';
import { NewsAdminComponent } from './components/news-admin/news-admin.component';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { AuthorizationGuard } from './guards/authorization/authorization.guard';
import { NewsComponent } from './components/news/news.component';
import { AttractionListComponent } from "./components/attraction-list/attraction-list.component";
import { PublicComponent } from './components/public/public.component';
import { AssingEditorComponent } from './components/assing-editor/assing-editor.component';
const routes: Routes = [

  {
    path: 'public', component: PublicComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'attraction-list', component: AttractionListComponent },
      { path: 'details/:attractionName', component: DetailsComponent },
      { path: 'news/:newId', component: NewsComponent }
    ]
  },
 
  {
    path: 'account', component: AccountComponent, children: [
      { path: 'login', component: LoginComponent }
   ]
  },
  {
    // canActivate: [AuthenticationGuard],
    path: 'secure', component: SecureComponent, children: [

      { path: 'attraction-editor', component: AttractionAdminComponent },
      { path: 'news-admin', component: NewsAdminComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'assing-editor', component: AssingEditorComponent }
      /* { path: 'attraction-editor', component: AttractionAdminComponent, canActivate: [AuthorizationGuard], data: { role: 'Editor' } },
      { path: 'news-admin', component: NewsAdminComponent, canActivate: [AuthorizationGuard], data: { role: 'Admin' } },
      { path: 'profile', component: ProfileComponent },
      { path: 'assing-editor', component: AssingEditorComponent, canActivate: [AuthorizationGuard], data: { role: 'Admin' } } */
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'public/home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
