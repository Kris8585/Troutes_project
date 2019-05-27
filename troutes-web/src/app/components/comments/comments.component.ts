import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { combineLatest, Subscription, Observable } from 'rxjs';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { LoginService } from 'src/app/services/login/login.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  /**
     * Almacena el ID que corresponde al atractivo que se tiene abierto
     */
  @Input() attractiveId: number;
  /**
   * Almacena el ID que corresponde al usuario que tiene la sesion iniciada
   */
  ///@Input() userId: string;
  currentUser: UserType;
  /**
   * Envia el mensaje de emision con el puntaje medio del atractivo
   */
  @Output() scoreEmmitter = new EventEmitter<number>();
  /**
   * Controla el formulario, que se utiliza para el control de datos
   */

  @Input() showReview: boolean;

  public formGroupComment: FormGroup;
  formBuilder: FormBuilder;
  /**
   * Contiene todos los comentarios que se han hecho en el sistema
   */
  attractiveComments: CommentaryType[] = [];
  /**
   * Almacena los comentarios que corresponden a un solo atractivo, el cual es el que se esta visitando
   */
  comments: CommentaryType[];
  comments$: Observable<any>;
  paramSuscription: Subscription;
  commentsSuscription: Subscription;
  isCommentsLoaded: boolean = false;
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
  private commentAction: number;
  private maintenanceComment: CommentaryType;


  constructor(private _modalService: BsModalService,
    private _loginService: LoginService,
    private _dataInformationService: DataInformationService,
    private _changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentUser = this.loadCurrentUser();
    this.formBuilder = new FormBuilder();
    this.loadCommnents();
    /*  this.puntajeMedioEmit();
     this.iniciarComentario(); */
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.paramSuscription.unsubscribe();
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
    //debugger
    /*  this.commentsSuscription = this._dataInformationService.getCommentByAttractionId(this.attractiveId).subscribe((elements) => {
       elements.forEach(element => {
         debugger
         this.attractiveComments.push(element);
       });
     }) */
    this.commentsSuscription = this._dataInformationService.getAllComments().subscribe(
      (elements) => {
        elements.forEach(comment => {
          this.attractiveComments.push(comment);
        });
        this.returnedComments = this.attractiveComments.slice(0, this.itemsPerPage);
        this.puntajeMedioEmit();
        this.iniciarComentario();
      });
    /*  this.commentsSuscription = this._dataInformationService.getAllAttractions().subscribe((atracttion) => {
       atracttion.forEach(element => {
         console.log("Llamado desde comentario :" + element.name);
       });
     }) */
    // this.comments$ = this._dataInformationService.getCommentByAttractionId(this.attractiveId);
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


  iniciarComentario = () => {
    this.formGroupComment = this.formBuilder.group({
      commentId: ['(nueva)', [Validators.required]],
      userId: [''],
      attractiveId: [''],
      comment: ['', [Validators.required, Validators.minLength(15)]],
      score: [''],
      creationDate: [new Date()]
    });
  };

  cargarComentario = (id: number) => {
    // const listaNoticias = this.dataStorageService.getObjectValue('noticias');
    this.returnedComments.forEach(commentInside => {
      if (commentInside.commentId == id) {
        this.formGroupComment = this.formBuilder.group({
          commentId: [id, [Validators.required]],
          userId: [commentInside.userId],
          attractiveId: [commentInside.attractiveId],
          comment: [
            commentInside.comment,
            [Validators.required, Validators.minLength(15)]
          ],
          score: [commentInside.score],
          creationDate: [commentInside.creationDate]
        });
      }
    });
  };

  guardarComentario(_formGroup: FormGroup) {
    // Asigna el valor del ID del usuario
    this.formGroupComment.value.idUsuario = this.currentUser.userId;
    // Asigna el ID del atractivo que esta siendo visitado
    this.formGroupComment.value.idAtractivo = this.attractiveId;
    // console.log(_formGroup);
    if (this.formGroupComment.valid) {
      let comentarioIndex = -1;
      // const listaNoticias = this.dataStorageService.getObjectValue('noticias');
      this.attractiveComments.forEach((comentario, index) => {
        if (comentario.commentId == this.formGroupComment.value.id) {
          comentarioIndex = index;
        }
      });
      if (comentarioIndex >= 0) {
        this.attractiveComments[comentarioIndex] = this.formGroupComment.value;
      } else {
        // Si no existe un ID significa que es nuevo y se asigna el ultimo en la lista
        const ultimoGuardado = this.attractiveComments.reduce(function (prev, current) {
          return (prev.commentId > current.commentId) ? prev : current;
        })
        //this.formGroupComentario.value.id = this.comentarios.length;
        this.formGroupComment.value.id = +ultimoGuardado.commentId + 1;
        this.attractiveComments.push(this.formGroupComment.value);
      }

      this.formGroupComment.patchValue({ fechaCreacion: new Date() });
      //this._dataStorage.setObjectValue(this._dataControl.keyComentarios, this.attractiveComments);
      //TODO- Aqui funcion para guardar a firebase
      alert('Informacion guardada');
      // Recarga los comntario para agregar el nuevo
      //this.loadCommnents();
      // Si la accion es crear o elminar se limpia el formulario y se esconde la ventana
      if (this.commentAction != 1) {
        this.iniciarComentario();
        this.modalRef.hide();
      }
      // se coloca la paginacion en el primer lugar
      this.setPage(1);
      // Se emite el valor medio del atractivo actualmente
      this.puntajeMedioEmit();
    } else {
      alert('Debe completar la informacion correctamente');
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

    //this.loadCommnents();
    this.setPage(1);
    this.puntajeMedioEmit();
    this.modalRef.hide();
    // this.comentarioAccion
  }

  declineDelete() {
    this.iniciarComentario();
    this.modalRef.hide();
  }


  mantenimientoComentario(comentarioID: CommentaryType, templateModal: TemplateRef<any>, accion: number) {
    // Alamcen la accion a realizar por el usuario
    this.commentAction = accion;
    // Alamacena el objeto comentario que el uaurio esta abriendo
    this.maintenanceComment = comentarioID;
    // Carga el comentario
    this.cargarComentario(this.maintenanceComment.commentId);
    // console.log('Eliminar comentario: ' + comentarioID.id + ' | Accion: ' + (accion === 0 ? 'Editar' : 'Eliminar'));
    // Permite detectar la accion de la ventana modal en este caso si esta es escondida
    const _combine = combineLatest(
      this._modalService.onHide,
      this._modalService.onHidden
    ).subscribe(() => this._changeDetection.markForCheck());

    this.subscriptions.push(
      this._modalService.onHidden.subscribe((reason: string) => {
        this.iniciarComentario();
        this.unsubscribe();
      })
    )
    this.subscriptions.push(_combine);
    this.modalRef = this._modalService.show(
      templateModal,
      Object.assign({}, { class: 'modal-lg' }, this.config)
    );

  }
  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

}
