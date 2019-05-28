import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './components/account/account.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginService } from './services/login/login.service';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { RegisterService } from './services/register/register.service';
import { DataInformationService } from './services/data-information/data-information.service';
import { ProfileComponent } from './components/profile/profile.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { SecureComponent } from './components/secure/secure.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceComponent } from './components/service/service.component';
import { NewsAdminComponent } from './components/news-admin/news-admin.component';
import { AttractionAdminComponent } from './components/attraction-admin/attraction-admin.component';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { AuthorizationGuard } from './guards/authorization/authorization.guard';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RatingModule } from 'ngx-bootstrap/rating';
import { LightboxModule } from 'ngx-lightbox';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { NewsComponent } from './components/news/news.component';
import { AttractionListComponent } from './components/attraction-list/attraction-list.component';
import { CommentsComponent } from './components/comments/comments.component';
import { RatingComponent } from './components/rating/rating.component';
import { DomSecurityPipe } from './pipes/domSecurity/dom-security.pipe';
import { PublicComponent } from './components/public/public.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NavbarComponent,
    FooterComponent,
    DetailsComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RecoveryComponent,
    SecureComponent,
    AboutUsComponent,
    ContactComponent,
    ServiceComponent,
    NewsAdminComponent,
    AttractionAdminComponent,
    CarrouselComponent,
    NewsComponent,
    AttractionListComponent,
    CommentsComponent,
    RatingComponent,
    DomSecurityPipe,
    PublicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ReactiveFormsModule ,
    FormsModule ,
    LightboxModule,
    SnotifyModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    RatingModule.forRoot()
    
  ],
  providers: [LoginService, RegisterService, DataInformationService, 
  AuthenticationGuard, AuthorizationGuard, { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
  SnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
