import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { Observable, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';

import { UploadsService } from 'src/app/services/uploads/uploads.service';
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
  acctionMantenance: number = 0;
  newMantenance: NewsType;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  attractionSubscription: Subscription;
  @ViewChild('imgNewsInput') inputImageNews: ElementRef;

  public formGroupNews: FormGroup;
  constructor(
    private _modalService: BsModalService,
    private _formBuilderNews: FormBuilder,
    private _snotifyService: SnotifyService,
    private _dataService: DataInformationService,
    private _uploadService: UploadsService
  ) {
    this.loadAllNews();
  }

  ngOnInit() {
  }

  loadAllNews() {
    this.newsList$ = this._dataService.getAllNews();
  }

  newNewsControl(news: NewsType, template: TemplateRef<any>) {
    this.acctionMantenance = 0;
    this.newMantenance = news;
    this.newNewsForm();
    this.modalRef = this._modalService.show(template);
  }
  editNewsControl(news: NewsType, template: TemplateRef<any>) {
    this.acctionMantenance = 1;
    this.newMantenance = news;
    this.editNewsForm();
    this.modalRef = this._modalService.show(template);
  }

  deleteNewsControl(news: NewsType, template: TemplateRef<any>) {
    this.acctionMantenance = 2;
    this.newMantenance = news;
    this.modalRef = this._modalService.show(template);
  }

  editNewsForm() {
    this.formGroupNews = this._formBuilderNews.group({
      id: [this.newMantenance.id],
      newsId: [this.newMantenance.newsId, [Validators.required]],
      title: [this.newMantenance.tittle, [Validators.required, Validators.minLength(5)]],
      postTitle: [this.newMantenance.postTittle, [Validators.required, Validators.minLength(15)]],
      description: [this.newMantenance.description, [Validators.required, Validators.minLength(15)]],
      image: [this.newMantenance.image, [Validators.required]],
      creationDate: [this.newMantenance.creationDate, [Validators.required]],
      modifyDate: [new Date().toString(), [Validators.required]]
    })
  }
  newNewsForm() {
    this.formGroupNews = this._formBuilderNews.group({
      id: [''],
      newsId: [''],
      title: ['', [Validators.required, Validators.minLength(5)]],
      postTitle: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(15)]],
      image: [''],
      creationDate: [''],
      modifyDate: ['']
    })
  }
  newsMantenance() {
    if (this.acctionMantenance == 0) {
      this.newNews();
    }
    else if (this.acctionMantenance == 1) {
      this.editNews();
      //editar
    }
    else if (this.acctionMantenance == 2) {
      //eliminar
      this.deleteNews();
    } else {
      this._snotifyService.warning('Accion de mantenimiento no definida', 'Atención');
    }
  }

  newNews() {
    if (this._uploadService.multipleLoadCurrent.length > 0) {
      this.formGroupNews.value.image = this._uploadService.multipleLoadCurrent[0].url;
    }
    if (this.formGroupNews.valid && this.formGroupNews.value.image) {
      const newNews: NewsType = {
        'id': '1',
        'newsId': '',
        'tittle': this.formGroupNews.value.title,
        'postTittle': this.formGroupNews.value.postTitle,
        'description': this.formGroupNews.value.description,
        'image': this.formGroupNews.value.image,
        'creationDate': new Date().toString(),
        'modifyDate': new Date().toString(),
      }
      let newId = this._dataService.saveNews(newNews);
      this.decline();
      this._snotifyService.success('Información guardada correctamente', 'Información');
    } else {
      this._snotifyService.warning('Debe completar la información correctamente', 'Atención');
    }
  }
  editNews() {
    if (this._uploadService.multipleLoadCurrent.length > 0) {
      this.formGroupNews.value.image = this._uploadService.multipleLoadCurrent[0].url;
    }
    if (this.formGroupNews.valid && this.newMantenance) {
      const newNews: NewsType = {
        'id': this.newMantenance.id,
        'newsId': this.newMantenance.newsId,
        'tittle': this.formGroupNews.value.title,
        'postTittle': this.formGroupNews.value.postTitle,
        'description': this.formGroupNews.value.description,
        'image': this.formGroupNews.value.image,
        'creationDate': this.newMantenance.creationDate,
        'modifyDate': new Date().toString(),
      }
      let newId = this._dataService.saveNews(newNews);
      this.decline();
      //Llmar misma ruta
      this._snotifyService.success('Información guardada correctamente', 'Información');
    } else {
      this._snotifyService.warning('Debe completar la información correctamente', 'Atención');
    }
  }
  deleteNews() {
    if (this.newMantenance && this.newMantenance.newsId != '') {
      this._dataService.deleteNew(this.newMantenance);
      this._snotifyService.success('Información eliminada correctamente', 'Información');
    } else {
      this._snotifyService.warning('No ha sido posible reaizar la accion solicitada', 'Atención');
    }
  }

  decline() {
    this.modalRef.hide();
    this._uploadService.multipleLoadCurrent = [];
    this._uploadService.deleteIMageList = [];
  }
  appyDelete() {
    this.deleteNews();
    this.modalRef.hide();
    //this._snotifyService.success('Información eliminada correctamente', 'Información');
  }



}
