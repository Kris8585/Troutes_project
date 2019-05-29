import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { Observable, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.css']
})
export class NewsAdminComponent implements OnInit {
  templateModal = 'newsMaintenance';
  newsList$: Observable<NewsType[]>;
  modalRef: BsModalRef;
  valueWidth = false;
  subscriptions: Subscription[] = [];

  constructor(
    private _modalService: BsModalService,
    private _dataService: DataInformationService
  ) {
    this.loadAllNews();
  }

  ngOnInit() {
  }

  loadAllNews() {
    this.newsList$ = this._dataService.getAllNews();
  }
  deleteNew(news: NewsType, template: TemplateRef<any>) {
    console.log('Eliminar: ' + news);
    this.modalRef = this._modalService.show(template);
  }
  editNew(news: NewsType, template: TemplateRef<any>) {
    console.log('Editar: ' + news);
    this.modalRef = this._modalService.show(template);
  }



}
