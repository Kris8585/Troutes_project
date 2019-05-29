import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { Observable, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
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
  //Subida Imagen
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  attractionSubscription: Subscription;
  @ViewChild('imgNewsInput') inputImageNews: ElementRef;

  public formGroupNews: FormGroup;
  constructor(
    private _modalService: BsModalService,
    private _formBuilderNews: FormBuilder,
    private _fireStorage: AngularFireStorage,
    private _snotifyService: SnotifyService,
    private _dataService: DataInformationService
  ) {
    this.loadAllNews();
  }

  ngOnInit() {
  }

  loadAllNews() {
    this.newsList$ = this._dataService.getAllNews();
  }

  //Definion de acciones cuando estamos en lista
  newNewsControl(news: NewsType, template: TemplateRef<any>) {
    console.log('Editar: ' + news);
    this.modalRef = this._modalService.show(template);
    this.acctionMantenance = 0;
    this.newMantenance = news;
    this.newNewsForm();
  }
  editNewsControl(news: NewsType, template: TemplateRef<any>) {
    console.log('Editar: ' + news);
    this.modalRef = this._modalService.show(template);
    this.acctionMantenance = 1;
    this.newMantenance = news;
    this.editNewsForm();
  }

  deleteNewsControl(news: NewsType, template: TemplateRef<any>) {
    console.log('Elimianr: ' + news);
    this.modalRef = this._modalService.show(template);
    this.acctionMantenance = 2;
    this.newMantenance = news;
  }
  //Iniciacializacion de forms
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
    console.log('Boton me dio');
    debugger
    //nuevo
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
  ///Funciones de accion de Crud
  newNews() {
    this.formGroupNews.value.image = 'https://firebasestorage.googleapis.com/v0/b/troutes-c1ba9.appspot.com/o/uploads%2Fnews%2Fnews_b9hn5eff0en?alt=media&token=60a645da-0efc-4742-8cc5-f65b638f3425';
    if (this.formGroupNews.valid) {
      const newNews: NewsType = {
        'id': '1',
        'newsId': '',
        'tittle': this.formGroupNews.value.title,
        'postTittle': this.formGroupNews.value.postTitle,
        'description': this.formGroupNews.value.description,
        'image': '',
        'creationDate': new Date().toString(),
        'modifyDate': new Date().toString(),
      }
      newNews.image = 'https://firebasestorage.googleapis.com/v0/b/troutes-c1ba9.appspot.com/o/uploads%2Fnews%2Fnews_b9hn5eff0en?alt=media&token=60a645da-0efc-4742-8cc5-f65b638f3425';
      let newId = this._dataService.saveNews(newNews);
      this.decline();
      //Llmar misma ruta
      this._snotifyService.success('Información guardada correctamente', 'Información');
    } else {
      this._snotifyService.warning('Debe completar la información correctamente', 'Atención');
    }
  }
  editNews() {
    if (this.formGroupNews.valid && this.newMantenance) {
      const newNews: NewsType = {
        'id': this.newMantenance.id,
        'newsId': this.newMantenance.newsId,
        'tittle': this.formGroupNews.value.title,
        'postTittle': this.formGroupNews.value.postTitle,
        'description': this.formGroupNews.value.description,
        'image': this.newMantenance.image,
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
  //Subida Imagen
  onUpload(event) {
    //this.isLoadingImage = true;
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `uploads/news/news_${id}`;
    const ref = this._fireStorage.ref(filePath);
    const task = this._fireStorage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe(() => {
      //this.isLoadingImage = false;
      this.formGroupNews.value.image = this.urlImage;
      //this.userLog.profile_photo = this.formGroupNews.value.image;
      console.log('Imagen cargada');
    });
  }
  ///
  decline() {
    this.modalRef.hide();
  }
  appyDelete() {
    this.deleteNews();
    this.modalRef.hide();
    //this._snotifyService.success('Información eliminada correctamente', 'Información');
  }



}
