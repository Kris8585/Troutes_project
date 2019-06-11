import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { LoginService } from 'src/app/services/login/login.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";

import { RegisterService } from 'src/app/services/register/register.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userLog: UserType;
  followAttraction: TouristAttractionsType[] = [];
  commentsDone$: Observable<CommentaryType[]>;
  userId: string;
  defaulImage = 'https://firebasestorage.googleapis.com/v0/b/troutes-c1ba9.appspot.com/o/uploads%2FRana-de-WhatsApp.jpg?alt=media&token=8eef682b-7d1e-45d6-89b4-cdc13ad55528';
  isUpdateInit: boolean = false;
  isLoadingImage = false;
  public formGroupSession: FormGroup;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  attractionSubscription: Subscription;
  @ViewChild('imgUserInput') inputImageUser: ElementRef;

  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _registerService: RegisterService,
    private _loginService: LoginService,
    private _fireStorage: AngularFireStorage,
    private _dataInformationService: DataInformationService,
    private _snotifyService: SnotifyService,
    private _formBuilderSession: FormBuilder) {
    this.initUserForm();
    this.userLog = this._loginService.getCurrentUser();
    this.resetUser();
    this.getFollowPlaces();
    this.getDoneComments();

  }

  ngOnInit() {
  }

  initUserForm = () => { 
    this.formGroupSession = this._formBuilderSession.group({
      email_session: ["", [Validators.required]],
      descriprion_session: ["", [Validators.required]],
      name_session: ["", [Validators.required]],
      nationality_session: ["", [Validators.required]],
      //profileImage_session: ["",],
    });
  }

  updateProfile() {
    debugger
    console.log(this.urlImage);
    if (this.formGroupSession.valid && this.userLog) {
      const userUpdate: UserType = {
        'userId': this.userLog.userId,
        'email': this.userLog.email,
        'role': this.userLog.role,
        'description': this.formGroupSession.value.descriprion_session,
        'name': this.formGroupSession.value.name_session,
        'nationality': this.formGroupSession.value.nationality_session,
        'profile_photo': this.defaulImage
      }
      this.userId = this._registerService.setUpdateUser(userUpdate);
      this._snotifyService.success('Información guardada correctamente', 'Información');
    } else {
      this._snotifyService.warning('Debe completar la información correctamente', 'Atención');
    }
  }

  enableEdit() {
    this.isUpdateInit = !this.isUpdateInit
    if (!this.isUpdateInit) {
      this.resetUser();
    }
  }

  resetUser() {
    if (this.userLog) {
      this.formGroupSession.patchValue({
        email_session: this.userLog.email,
        descriprion_session: this.userLog.description,
        name_session: this.userLog.name,
        nationality_session: this.userLog.nationality,
        profileImage_session: this.userLog.profile_photo,
      })

    }
  }



  onUpload(event) {
    this.isLoadingImage = true;
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `upload/profile_${id}`;
    const ref = this._fireStorage.ref(filePath);
    const task = this._fireStorage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe(() => {
      this.isLoadingImage = false;
      this.formGroupSession.value.profileImage_session = this.urlImage;


        this.userLog.profile_photo = this.formGroupSession.value.profileImage_session;
   
      

    });
  }

  validarGuardado(): boolean {
    if (this.formGroupSession.valid && !this.isLoadingImage) {
      return true
    } else {
      return false;
    }
  }



  getFollowPlaces() {
    this._dataInformationService.getFollowedSites('bUiIHukfgmh87QwS62EPmS0a9Qu2').subscribe((followSites) => {
      followSites.forEach(site => {
        this._dataInformationService.getAtractionById(site.attractionId).subscribe((attractions) => {
          attractions.forEach(attr => {
            console.log(attr)
            this.followAttraction.push(attr);
          });
        });
      });
    });
  }

  getDoneComments() {
    this.commentsDone$ = this._dataInformationService.getCommentByUserId('bUiIHukfgmh87QwS62EPmS0a9Qu2');
  }


  seePlace(namePlace: string) {
    this._router.navigate(['public/details/', namePlace]);
  }



}
