import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { LoginService } from 'src/app/services/login/login.service';
import { UploadsService } from 'src/app/services/uploads/uploads.service';
import { RegisterService } from 'src/app/services/register/register.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userLog: UserType;
  followAttraction: TouristAttractionsType[] = [];
  attractionList: TouristAttractionsType[] = [];
  commentsDone$: Observable<CommentaryType[]>;
  userId: string;
  isUpdateInit: boolean = false;
  public formGroupSession: FormGroup;

  //uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  //attractionSubscription: Subscription;
  @ViewChild('imgUserInput') inputImageUser: ElementRef;

  constructor(private _router: Router,
    private _registerService: RegisterService,
    private _loginService: LoginService,
    private _dataInformationService: DataInformationService,
    private _snotifyService: SnotifyService,
    private _formBuilderSession: FormBuilder,
    private _uploadService: UploadsService) {
    this.initUserForm();
    this.userLog = this._loginService.getCurrentUser();
    this.resetUser();
    this.getFollowPlaces();
    this.getDoneComments();
    this.getAllAttractions();

  }

  ngOnInit() {
  }

  initUserForm = () => {
    this.formGroupSession = this._formBuilderSession.group({
      email_session: ["", [Validators.required]],
      descriprion_session: ["", [Validators.required]],
      name_session: ["", [Validators.required]],
      nationality_session: ["", [Validators.required]],
      profileImage_session: [""]
    });
  }

  updateProfile() {
    debugger
    console.log(this.urlImage);
    if (this._uploadService.multipleLoadCurrent.length > 0) {
      this.formGroupSession.value.profileImage_session = this._uploadService.multipleLoadCurrent[0].url;
    }
    if (this.formGroupSession.valid && this.userLog && this.formGroupSession.value.profileImage_session) {
      const userUpdate: UserType = {
        'userId': this.userLog.userId,
        'email': this.userLog.email,
        'role': this.userLog.role,
        'description': this.formGroupSession.value.descriprion_session,
        'name': this.formGroupSession.value.name_session,
        'nationality': this.formGroupSession.value.nationality_session,
        'profile_photo': this.formGroupSession.value.profileImage_session
      }
      this.userId = this._registerService.setUpdateUser(userUpdate);
      this.completeUpdate();
      this._snotifyService.success('Información guardada correctamente', 'Información');
    } else {
      this._snotifyService.warning('Debe completar la información correctamente', 'Atención');
    }
  }
  completeUpdate() {
    this._uploadService.multipleLoadCurrent = [];
    this._uploadService.deleteIMageList = [];
    this.isUpdateInit = false;
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

  getFollowPlaces() {
    this._dataInformationService.getFollowedSites(this.userLog.userId).subscribe((followSites) => {
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
  getAllAttractions() {
    this._dataInformationService.getAllAttractions().subscribe((attraction) => {
      attraction.forEach(site => {
        this.attractionList.push(site);
      });
    })
  }

  getDoneComments() {
    this.commentsDone$ = this._dataInformationService.getCommentByUserId(this.userLog.userId);
  }
  getAtracttionComment(attractionId: string): string {
    let attractionName = this.attractionList.find(site => site.attractionId == attractionId).name;
    return attractionName;
  }

  seePlace(namePlace: string) {
    this._router.navigate(['public/details/', namePlace]);
  }

  gotoAttraction(attractionId: string) {
    let attractionName = this.attractionList.find(site => site.attractionId == attractionId).name;
    this._router.navigate(['public/details/', attractionName]);
  }

}
