import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { SnotifyService } from 'ng-snotify';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginService } from 'src/app/services/login/login.service';
import { UploadsService } from 'src/app/services/uploads/uploads.service';
import { Upload } from 'src/app/classes/uploads/upload';
@Component({
  selector: 'app-attraction-admin',
  templateUrl: './attraction-admin.component.html',
  styleUrls: ['./attraction-admin.component.css']
})
export class AttractionAdminComponent implements OnInit {
  attractionList$: Observable<TouristAttractionsType[]>
  modalRef: BsModalRef;
  attractionMantenance: TouristAttractionsType;
  public formGroupAttractive: FormGroup;
  defaultImage = 'https://firebasestorage.googleapis.com/v0/b/troutes-c1ba9.appspot.com/o/upload%2Fprofile_2bhaietw7cp?alt=media&token=4d06a078-0189-4c01-ba89-cecc7a9461af';
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  attractionSubscription: Subscription;
  logUser: UserType;
  selectSchedule: string[] = [];
  @ViewChild('imgUserInput') inputImageUser: ElementRef;
  constructor(private _modalService: BsModalService,
    private _formBuilderAttractive: FormBuilder,
    private _snotifyService: SnotifyService,
    private _dataInformationService: DataInformationService,
    private _loginService: LoginService,
    private _uploadService: UploadsService) {

    this.logUser = this._loginService.getCurrentUser();
    this.listAllAttractives();
  }

  ngOnInit() {
  }

  listAllAttractives() {
    this.attractionList$ = this._dataInformationService.getAtractionByEditorId(this.logUser.userId);
  }

  editAttraction(attractive: TouristAttractionsType, template: TemplateRef<any>) {
    console.log('Editar: ' + attractive);
    this.modalRef = this._modalService.show(template);
    this.attractionMantenance = attractive;
    this.editAtractiveForm();
  }

  editAtractiveForm() {
    let url = this.attractionMantenance.videUrl != '' ? 'https://www.youtube.com/watch?v=' + [this.attractionMantenance.videUrl] : '';
    this.formGroupAttractive = this._formBuilderAttractive.group({
      id: [this.attractionMantenance.id],
      attractionId: [this.attractionMantenance.attractionId, [Validators.required]],
      name: [this.attractionMantenance.name, [Validators.required]],
      description: [this.attractionMantenance.description, [Validators.required]],
      location: [this.attractionMantenance.location],
      videUrl: [url, [Validators.required]],
      editorId: [this.attractionMantenance.editorId, [Validators.required]],
      active: [this.attractionMantenance.active],
      creationDate: [this.attractionMantenance.creationDate],
      modifyDate: [this.attractionMantenance.modifyDate],
      images: this._formBuilderAttractive.array(
        [Validators.required]
      ),
      schedule: this._formBuilderAttractive.array(
        [Validators.required]
      )
    })
  }
  addShedule(daySchedule?: string) {
    (<FormArray>this.formGroupAttractive.controls['schedule']).push(
      new FormControl(daySchedule, Validators.required)
    );
  }
  cleanSchedule() {
    while (this.formGroupAttractive.value.schedule.length !== 0) {
      (<FormArray>this.formGroupAttractive.controls['schedule']).removeAt(0);
    }
  }
  addImage(imageUrl?: any) {
    (<FormArray>this.formGroupAttractive.controls['images']).push(
      new FormControl(imageUrl, Validators.required)
    );
  }
  cleanImages() {
    while (this.formGroupAttractive.value.images.length !== 0) {
      (<FormArray>this.formGroupAttractive.controls['images']).removeAt(0);
    }
  }

  editAttractive() {

    this.imageControl();
    if (this.formGroupAttractive.valid && this.attractionMantenance && this.formGroupAttractive.value.schedule.length > 0) {
      const newAttractive: TouristAttractionsType = {
        'id': '1',
        'attractionId': this.attractionMantenance.attractionId,
        'name': this.formGroupAttractive.value.name,
        'description': this.formGroupAttractive.value.description,
        'images': this.formGroupAttractive.value.images,
        'location': this.attractionMantenance.location,
        'videUrl': this.getVideoID(this.formGroupAttractive.value.videUrl),
        'schedule': this.formGroupAttractive.value.schedule,
        'editorId': this.attractionMantenance.editorId,
        'active': true,
        'creationDate': this.attractionMantenance.creationDate,
        'modifyDate': new Date().toString(),
      }
      let attractiveId = this._dataInformationService.saveAttractive(newAttractive);
      this.decline();
      this._snotifyService.success('Información guardada correctamente', 'Información');
    } else {
      this._snotifyService.warning('Debe completar la información correctamente', 'Atención');
    }
  }

  private imageControl() {
    if (this._uploadService.deleteIMageList.length > 0) {
      this._uploadService.deleteIMageList.forEach(elementUrl => {
        this.attractionMantenance.images.forEach((maintenanceImage, index) => {
          if (elementUrl == maintenanceImage.imageUrl) {
            this.attractionMantenance.images.splice(index, 1);
          }
        });
      });
    }
    this.assingImages(this._uploadService.multipleLoadCurrent);
  }

  decline() {
    this.modalRef.hide();
    this._uploadService.multipleLoadCurrent = [];
    this._uploadService.deleteIMageList = [];
  }

  getVideoID(fullURL: string) {
    var newID = fullURL.split('v=')[1].split('&')[0];
    return newID;
  }

  newSchedule($event: string[]) {
    let tempSchedule = $event;
    this.selectSchedule = tempSchedule;
    this.cleanSchedule();
    tempSchedule.forEach(element => {
      this.addShedule(element);
    });
  }

  assingImages(imagesList: Upload[]) {
    this.cleanImages();
    let currentList = this.attractionMantenance.images;
    imagesList.forEach(newImage => {
      const tempImage = {
        imageUrl: newImage.url
      }
      currentList.push(tempImage);
    });
    currentList.forEach(image => {
      this.addImage(image);
    });
    this._uploadService.multipleLoadCurrent = [];
  }
}
