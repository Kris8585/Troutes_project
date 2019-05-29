import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-assing-editor',
  templateUrl: './assing-editor.component.html',
  styleUrls: ['./assing-editor.component.css']
})
export class AssingEditorComponent implements OnInit {
  attractionList$: Observable<TouristAttractionsType[]>;
  editorsList: UserType[] = [];
  modalRef: BsModalRef;
  editorsSuscription: Subscription;
  constructor(
    private _modalService: BsModalService,
    private _dataService: DataInformationService
  ) {
    this.getAllAttractions();
    this.getAllEditors();
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.editorsSuscription.unsubscribe();
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
    //return this._dataService.getUserById(attraction.editorId);
  }

  /* delete(news: NewsType, template: TemplateRef<any>) {
    console.log('Eliminar: ' + news);
    this.modalRef = this._modalService.show(template);
  } */
  editEditorAttraction(attractive: TouristAttractionsType, template: TemplateRef<any>) {
    console.log('Editar: ' + attractive);
    this.modalRef = this._modalService.show(template);
  }
}
