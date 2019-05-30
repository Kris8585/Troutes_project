import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginService } from 'src/app/services/login/login.service';
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
  @ViewChild('imgUserInput') inputImageUser: ElementRef;
  constructor(private _modalService: BsModalService,
    private _formBuilderAttractive: FormBuilder,
    private _snotifyService: SnotifyService,
    private _fireStorage: AngularFireStorage,
    private _dataInformationService: DataInformationService,
    private _loginService: LoginService,
    private _activatedRoute: ActivatedRoute) {
    this.listAllAttractives();
    this.logUser = this._loginService.getCurrentUser();
  }

  ngOnInit() {
  }

  listAllAttractives() {
    this.attractionList$ = this._dataInformationService.getAtractionByEditorId(this.logUser.userId);
  }


  /* editAttraction(attraction: TouristAttractionsType, template: TemplateRef<any>) {
    console.log('Editar: ' + attraction);
    this.modalRef = this._modalService.show(template);
  } */

  editAttraction(attractive: TouristAttractionsType, template: TemplateRef<any>) {
    console.log('Editar: ' + attractive);
    this.modalRef = this._modalService.show(template);
    this.attractionMantenance = attractive;
    this.editAtractiveForm();
    //this.attractiveMaintenance(attractive,1);
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
      //images: [this.attractionMantenance.images],
      //schedule: [this.attractionMantenance.schedule]
    })
  }

  editAttractive() {
    debugger
    if (this.formGroupAttractive.valid && this.attractionMantenance) {
      const id = Math.random().toString(36).substring(2);
      let image: any = {
        id: id,
        imageUrl: this.defaultImage
      };
      if (this.attractionMantenance.images.length > 0) {
        this.attractionMantenance.images.push(image);
      } else {
        this.attractionMantenance.images.push(image);
      }
      //this.formGroupAttractive.value.image
      this.attractionMantenance.images.push(image);
      const newAttractive: TouristAttractionsType = {
        'id': '1',
        'attractionId': this.attractionMantenance.attractionId,
        'name': this.formGroupAttractive.value.name,
        'description': this.formGroupAttractive.value.description,
        'images': this.attractionMantenance.images,
        'location': this.attractionMantenance.location,
        'videUrl': this.getVideoID(this.formGroupAttractive.value.videUrl),
        'schedule': this.getSchedule(),
        'editorId': this.attractionMantenance.editorId,
        'active': true,
        'creationDate': this.attractionMantenance.creationDate,
        'modifyDate': new Date().toString(),
      }
      let attractiveId = this._dataInformationService.saveAttractive(newAttractive);
      this.decline();
      //Llmar misma ruta
      this._snotifyService.success('Información guardada correctamente', 'Información');
    } else {
      this._snotifyService.warning('Debe completar la información correctamente', 'Atención');
    }
  }

  decline() {
    this.modalRef.hide();
  }
  getVideoID(fullURL: string) {
    var newID = fullURL.split('v=')[1].split('&')[0];
    return newID;
  }

  onUpload(event) {
    //this.isLoadingImage = true;
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `upload/profile_${id}`;
    const ref = this._fireStorage.ref(filePath);
    const task = this._fireStorage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe(() => {
      //this.isLoadingImage = false;
      this.formGroupAttractive.value.profileImage_session = this.urlImage;
      // let image: any = {
      //   id: id,
      //   imageUrl: this.urlImage
      // };
      // console.log(image);
      // this.attractionMantenance.images.push(image);
      console.log('Imagen cargada');
    });
  }
  getSchedule() {
    let horario: any = [{
      "id": 1,
      "dia": "L",
      "horaInicio": "08:00",
      "horaFin": "15:00"
    },
    {
      "id": 2,
      "dia": "M",
      "horaInicio": "08:00",
      "horaFin": "15:00"
    },
    {
      "id": 3,
      "dia": "I",
      "horaInicio": "08:00",
      "horaFin": "13:00"
    },
    {
      "id": 4,
      "dia": "J",
      "horaInicio": "08:00",
      "horaFin": "15:00"
    }
    ];
    return horario;
  }
}
