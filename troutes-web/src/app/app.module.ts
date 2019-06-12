import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { RegisterService } from './services/register/register.service';
import { DataInformationService } from './services/data-information/data-information.service';
import { ProfileComponent } from './components/profile/profile.component';
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
import { AssingEditorComponent } from './components/assing-editor/assing-editor.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LocationComponent } from './components/location/location.component';
import { AgmCoreModule } from '@agm/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SchedulePickComponent } from './components/schedule-pick/schedule-pick.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NavbarComponent,
    FooterComponent,
    DetailsComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
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
    PublicComponent,
    AssingEditorComponent,
    LocationComponent,
    SchedulePickComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule,
    LightboxModule,
    MatSidenavModule,
    MatTooltipModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    SnotifyModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    RatingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AgmCoreModule.forRoot({ apiKey: environment.googleMapsKey }),
    SweetAlert2Module.forRoot()
  ],
  providers: [AngularFireAuth, LoginService, RegisterService, DataInformationService,
    AuthenticationGuard, AuthorizationGuard, { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
