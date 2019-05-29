import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-attraction-admin',
  templateUrl: './attraction-admin.component.html',
  styleUrls: ['./attraction-admin.component.css']
})
export class AttractionAdminComponent implements OnInit {
  attractionList$: Observable<TouristAttractionsType[]>
  modalRef: BsModalRef;
  constructor(private _modalService: BsModalService,
    private _dataInformationService: DataInformationService,
    private _activatedRoute: ActivatedRoute) {
    this.listAllAttractives();
  }

  ngOnInit() {
  }


  showAttraction() {

  }
  listAllAttractives() {
    this.attractionList$ = this._dataInformationService.getAtractionByEditorId('bUiIHukfgmh87QwS62EPmS0a9Qu2');
  }
  deleteAttraction(attraction: TouristAttractionsType, template: TemplateRef<any>) {
    console.log('Eliminar: ' + attraction);
    this.modalRef = this._modalService.show(template);
  }
  editAttraction(attraction: TouristAttractionsType, template: TemplateRef<any>) {
    console.log('Editar: ' + attraction);
    this.modalRef = this._modalService.show(template);
  }
}
