import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
  constructor(private _modalService: BsModalService,
    private _formBuilderAttractive: FormBuilder,
    private _snotifyService: SnotifyService,
    private _dataInformationService: DataInformationService,
    private _activatedRoute: ActivatedRoute) {
    this.listAllAttractives();
  }

  ngOnInit() {
  }


  showAttraction() {

  }
  listAllAttractives() {
    this.attractionList$ = this._dataInformationService.getAtractionByEditorId('O0eQD0X4cceDJx6LzA44fWXmTHw2');
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
      images: [this.attractionMantenance.images],
      schedule: [this.attractionMantenance.schedule]
    })
  }

  editAttractive() {
    debugger
    if (this.formGroupAttractive.valid && this.attractionMantenance) {
      const newAttractive: TouristAttractionsType = {
        'id': '1',
        'attractionId': this.attractionMantenance.attractionId,
        'name': this.formGroupAttractive.value.name,
        'description': this.formGroupAttractive.value.description,
        'images': this.attractionMantenance.images,
        'location': this.attractionMantenance.location,
        'videUrl': this.getVideoID(this.formGroupAttractive.value.videUrl),
        'schedule': this.attractionMantenance.schedule,
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
}
