import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SnotifyService } from 'ng-snotify';
@Component({
  selector: 'app-assing-editor',
  templateUrl: './assing-editor.component.html',
  styleUrls: ['./assing-editor.component.css']
})
export class AssingEditorComponent implements OnInit {
  attractionList$: Observable<TouristAttractionsType[]>;
  attractionMantenance: TouristAttractionsType;
  acctionMantenance: number = 0;
  editorsList: UserType[] = [];
  modalRef: BsModalRef;
  editorsSuscription: Subscription;
  public formGroupAttractive: FormGroup;
  constructor(
    private _modalService: BsModalService,
    private _formBuilderAttractive: FormBuilder,
    private _snotifyService: SnotifyService,
    private _dataService: DataInformationService
  ) {
    this._formBuilderAttractive = new FormBuilder();
    this.getAllAttractions();
    this.getAllEditors();
    //this.initAttractivoEditorForm();
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.editorsSuscription.unsubscribe();
  }
  initAttractivoEditorForm = () => {
    this._formBuilderAttractive = new FormBuilder();
    this.formGroupAttractive = this._formBuilderAttractive.group({
      attractiveName: ["", [Validators.required, Validators.minLength(5)]],
      attractiveActive: [false],
      attractiveEditorId: ["", [Validators.required, Validators.minLength(4)]]
    });
  }
  getAllAttractions() {
    this.attractionList$ = this._dataService.getAllAttractions();
  }
  getAllEditors() {
    this.editorsSuscription = this._dataService.getUsersEditors().subscribe((editors) => {
      editors.forEach(editor => {
        this.editorsList.push(editor);
      });
    })
    //this.editorsList$ = this._dataService.getUsersRol();
  }

  getEditorName(attraction: string) {
    let selectEditor: UserType = null;
    let editorName = ''
    this.editorsList.forEach(editor => {
      if (editor.userId == attraction) {
        selectEditor = editor;
        editorName = editor.name;
      }
    });
    return editorName;
  }


  editEditorAttraction(attractive: TouristAttractionsType, template: TemplateRef<any>) {
    console.log('Editar: ' + attractive);
    this.modalRef = this._modalService.show(template);
    this.acctionMantenance = 1;
    this.attractionMantenance = attractive;
    this.editAtractiveForm();
    //this.attractiveMaintenance(attractive,1);
  }
  newEditorAttractive(attractive: TouristAttractionsType, template: TemplateRef<any>) {
    debugger;
    console.log('New: ' + attractive);
    this.modalRef = this._modalService.show(template);
    this.acctionMantenance = 0;
    this.attractionMantenance = null;
    this.newAtractivoForm();
    //this.attractiveMaintenance(attractive, 0);
  }
  deleteEditorAttractive(attractive: TouristAttractionsType, template: TemplateRef<any>) {
    console.log('Elimianr: ' + attractive);
    this.modalRef = this._modalService.show(template);
    this.acctionMantenance = 2;
    this.attractionMantenance = attractive;
  }


  attractiveMaintenance() {
    //nuevo
    if (this.acctionMantenance == 0) {
      this.newAtractive();
    }
    else if (this.acctionMantenance == 1) {
      this.editAttractive();
      //editar
    }
    else if (this.acctionMantenance == 2) {
      //eliminar
      this.deleteAttractive();
    } else {
      this._snotifyService.warning('Accion de mantenimiento no definida', 'Atención');
    }

    // this.formGroupAttractive = this._formBuilderAttractive.group({
    //   attractiveName: [attractive.name],
    //   attractiveEditorId: [attractive.editorId],
    // })
  }
  newAtractivoForm() {
    this.formGroupAttractive = this._formBuilderAttractive.group({
      attractiveActive: [false],
      attractiveName: ['', [Validators.required, Validators.minLength(5)]],
      attractiveEditorId: ['', [Validators.required]],
    })
  }
  editAtractiveForm() {
    this.formGroupAttractive = this._formBuilderAttractive.group({
      attractiveActive: [this.attractionMantenance.active, [Validators.required]],
      attractiveName: [this.attractionMantenance.name, [Validators.required]],
      attractiveEditorId: [this.attractionMantenance.editorId, [Validators.required]],
    })
  }
  editAttractive() {
    if (this.formGroupAttractive.valid && this.attractionMantenance) {
      const newAttractive: TouristAttractionsType = {
        'id': '1',
        'attractionId': this.attractionMantenance.attractionId,
        'name': this.formGroupAttractive.value.attractiveName,
        'description': this.attractionMantenance.description,
        'images': this.attractionMantenance.images,
        'location': this.attractionMantenance.location,
        'videUrl': this.attractionMantenance.videUrl,
        'schedule': this.attractionMantenance.schedule,
        'editorId': this.formGroupAttractive.value.attractiveEditorId,
        'active': this.formGroupAttractive.value.attractiveActive,
        'creationDate': this.attractionMantenance.creationDate,
        'modifyDate': new Date().toString(),
      }
      let attractiveId = this._dataService.saveAttractive(newAttractive);
      this.decline();
      //Llmar misma ruta
      this._snotifyService.success('Información guardada correctamente', 'Información');
    } else {
      this._snotifyService.warning('Debe completar la información correctamente', 'Atención');
    }
  }
  deleteAttractive() {
    if (this.attractionMantenance && this.attractionMantenance.attractionId != '') {
      this._dataService.deleteAttractive(this.attractionMantenance);
      this._snotifyService.success('Información eliminada correctamente', 'Información');
    } else {
      this._snotifyService.warning('No ha sido posible reaizar la accion solicitada', 'Atención');
    }
  }
  newAtractive() {
    debugger
    if (this.formGroupAttractive.valid) {
      const newAttractive: TouristAttractionsType = {
        'id': '1',
        'attractionId': '',
        'name': this.formGroupAttractive.value.attractiveName,
        'description': '',
        'images': [{
          'id': null,
          'imageUrl': '',
        }
        ],
        'location': '',
        'videUrl': '',
        'schedule': [{
          'schId': null,
          'day': '',
          'startTime': '',
          'endTime': ''
        }],
        'editorId': this.formGroupAttractive.value.attractiveEditorId,
        'active': false,
        'creationDate': new Date().toString(),
        'modifyDate': new Date().toString(),
      }
      let attractiveId = this._dataService.saveAttractive(newAttractive);
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
  appyDelete() {
    this.deleteAttractive();
    this.modalRef.hide();
    //this._snotifyService.success('Información eliminada correctamente', 'Información');
  }

}
