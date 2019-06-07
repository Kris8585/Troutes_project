import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { combineLatest, Subscription, Observable, empty } from 'rxjs';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { LoginService } from 'src/app/services/login/login.service';
import { SnotifyService } from 'ng-snotify';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() attractiveId: string;
  @Input() isAttractive: boolean;
  @Input() showReview: boolean;
  @Output() scoreEmmitter = new EventEmitter<number>();

  currentUser: UserType;
  public formGroupComment: FormGroup;
  formBuilder: FormBuilder;
  attractiveComments: CommentaryType[] = [];
  comments: CommentaryType[];
  commentsSuscription: Subscription;
  isCommentsLoaded: boolean = false;
  userHasComment: boolean = false;
  /**
   * Lista de comentarios que se muestran pagina por pagina en el sistema de paginacion
   */
  returnedComments: CommentaryType[];
  /**
   * Indica la cantidad de items que se muestra en la paginacion
   */
  paginationMaxSize: number = 10;
  /**
   * Indica la cantidad de items que se muestra por pagina
   */
  itemsPerPage: number = 4;
  /**
   * Indica la pagina en la que se encuentra en el sistema
   */
  currentPage: number = 1;
  /**
   * Parametros de configuracion de la ventana Modal
   */
  modalRef: BsModalRef;
  subscriptions: Subscription[] = [];
  valueWidth = false;
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };
  /**
   * @description Indica la accion que se esta realizando para el comentario 
   * 0=crear
   * 1=Editar
   * 2=Eliminar
   */
  private maintenanceComment: CommentaryType;
  private acctionMantenance: number;

  constructor(private _modalService: BsModalService,
    private _loginService: LoginService,
    private _dataInformationService: DataInformationService,
    private _snotifyService: SnotifyService, ) { }

  ngOnInit() {
    this.currentUser = this.loadCurrentUser();
    this.formBuilder = new FormBuilder();
    this.loadCommnents();
  }
  ngOnDestroy(): void {
    this.commentsSuscription.unsubscribe();
  }
  loadCurrentUser(): UserType {
    var tempUser: UserType = this._loginService.getCurrentUser();
    if (!tempUser) {
      tempUser = null;
    }
    return tempUser;
  }
  loadCommnents() {
    if (this.isAttractive) {
      this.commentsSuscription = this._dataInformationService.getCommentByAttractionId(this.attractiveId).subscribe(
        (elements) => {
          this.attractiveComments = [];
          this.userHasComment = false;
          elements.forEach(comment => {
            this.attractiveComments.push(comment);
          });
          if (this.attractiveComments.length > 0) {
            if (this.currentUser) {
              this.userHasComment = this.attractiveComments.some(tempComment => tempComment.userId == this.currentUser.userId && tempComment.attractiveId == this.attractiveId);
            }
            this.returnedComments = this.attractiveComments.slice(0, this.itemsPerPage);
          }
          this.puntajeMedioEmit();
          //this.iniciarComentario();

        });
    } else {
      this.commentsSuscription = this._dataInformationService.getCommentByUserId(this.currentUser.userId).subscribe(
        (elements) => {
          this.attractiveComments = [];
          this.userHasComment = false;
          elements.forEach(comment => {
            this.attractiveComments.push(comment);
          });
          this.returnedComments = this.attractiveComments.slice(0, this.itemsPerPage);
          this.puntajeMedioEmit();
          //this.iniciarComentario();
        });
    }

  }

  pageChanged(event: PageChangedEvent): void {

    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedComments = this.comments.slice(startItem, endItem);
  }


  puntajeMedioEmit() {
    let nMedio = 0;
    if (this.attractiveComments.length > 0) {
      this.attractiveComments.forEach(x => {
        nMedio += x.score;
      });
      nMedio = Math.round(nMedio / this.attractiveComments.length);
    }
    this.scoreEmmitter.emit(nMedio);
  }


  puntajeAsignar(puntos: number) {
    this.formGroupComment.value.puntaje = puntos;
  }

  newCommentMaintenance(comment: CommentaryType, template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
    this.acctionMantenance = 0;
    this.maintenanceComment = null;
    const tempComment: CommentaryType = {
      'attractiveId': '',
      'comment': '',
      'commentId': '',
      'creationDate': '',
      'score': 0,
      'userId': ''
    };
    this.maintenanceComment = tempComment
    this.newCommentForm();
  }
  editCommentMaintenance(comment: CommentaryType, template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
    this.acctionMantenance = 1;
    this.maintenanceComment = comment;
    this.editCommentForm();
  }
  deleteCommentMaintenance(comment: CommentaryType, template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
    this.acctionMantenance = 2;
    this.maintenanceComment = comment;
  }
  commentMantenace() {
    //nuevo
    if (this.acctionMantenance == 0) {
      this.newComment();
    }
    else if (this.acctionMantenance == 1) {
      this.editComment();
      //editar
    }
    else if (this.acctionMantenance == 2) {
      //eliminar
      this.deleteComment();
    } else {
      this._snotifyService.warning('Accion de mantenimiento no definida', 'Atención');
    }
  }
  newCommentForm() {
    this.formGroupComment = this.formBuilder.group({
      commentId: [''],
      userId: [this.currentUser.userId],
      attractiveId: [this.attractiveId],
      comment: ['', [Validators.required, Validators.minLength(15)]],
      score: [''],
      creationDate: [new Date()]
    });
  }
  editCommentForm() {
    this.formGroupComment = this.formBuilder.group({
      commentId: [this.maintenanceComment.commentId, [Validators.required]],
      userId: [this.maintenanceComment.userId, [Validators.required]],
      attractiveId: [this.maintenanceComment.attractiveId, [Validators.required]],
      comment: [this.maintenanceComment.comment, [Validators.required]],
      score: [this.maintenanceComment.score, [Validators.required]],
      creationDate: [this.maintenanceComment.creationDate]
    });
  }

  deleteComment() {
    if (this.maintenanceComment && this.maintenanceComment.commentId != '') {
      this._dataInformationService.deleteComment(this.maintenanceComment);
      this._snotifyService.success('Información eliminada correctamente', 'Información');
    } else {
      this._snotifyService.warning('No ha sido posible reaizar la accion solicitada', 'Atención');
    }
    this.modalRef.hide();
  }
  editComment() {
    if (this.formGroupComment.valid) {
      const newComment: CommentaryType = {
        'attractiveId': this.maintenanceComment.attractiveId,
        'userId': this.maintenanceComment.userId,
        'comment': this.formGroupComment.value.comment,
        'commentId': this.formGroupComment.value.commentId,
        'score': this.formGroupComment.value.score,
        'creationDate': new Date().toString()
      }
      let commentId = this._dataInformationService.saveComment(newComment);
      this._snotifyService.success('Información guardada correctamente', 'Información');
      this.decline();
    } else {
      this._snotifyService.warning('Debe completar la información correctamente', 'Atención');
    }
  }
  newComment() {
    if (this.formGroupComment.valid) {
      const newComment: CommentaryType = {
        'attractiveId': this.formGroupComment.value.attractiveId,
        'userId': this.formGroupComment.value.userId,
        'comment': this.formGroupComment.value.comment,
        'commentId': '',
        'score': this.formGroupComment.value.score,
        'creationDate': new Date().toString()
      }
      let commentId = this._dataInformationService.saveComment(newComment);
      this._snotifyService.success('Información guardada correctamente', 'Información');
      this.decline();
    } else {
      this._snotifyService.warning('Debe completar la información correctamente', 'Atención');
    }
  }


  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  confirmDelete() {
    this.attractiveComments.forEach((comentario, index) => {
      if (comentario.commentId == this.formGroupComment.value.id) {
        // comentarioIndex = index;
        this.attractiveComments.splice(index, 1);
      }
    });
    this.setPage(1);
    this.puntajeMedioEmit();
    this.modalRef.hide();
  }

  decline() {
    this.modalRef.hide();
  }
  appyDelete() {
    this.deleteComment();
    this.setPage(1);
    this.puntajeMedioEmit();
    this.modalRef.hide();
    this._snotifyService.success('Información eliminada correctamente', 'Información');
  }
  assingNewScore($event: number) {
    this.formGroupComment.value.score = $event;
  }
}
