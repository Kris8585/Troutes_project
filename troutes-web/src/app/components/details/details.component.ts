import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Lightbox, LightboxConfig, IAlbum } from 'ngx-lightbox';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { LoginService } from 'src/app/services/login/login.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  attractionId: number;
  attractionName: string;
  attraction: TouristAttractionsType;
  paramSuscription: Subscription;
  attractionSuscription: Subscription;
  attractiveSchedule: any[] = [];
  atractivoSeguidores$: UserType[] = [];
  isDataLoaded: boolean = false;
  averageScore: number = 0;
  isOpen = false;

  modalRef: BsModalRef;
  valueWidth = false;
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };
  seguidor: boolean = false;

  /*   sesionInicada: boolean = false;
    sesionUsarioId: number = 0;
    sesionRol: number; */
  persona: UserType;
  showReview: boolean;
  user: UserType;
  public _albums: Array<IAlbum>;

  constructor(private _route: ActivatedRoute,
    private _dataInformationService: DataInformationService,
    private _loginService: LoginService,
    private _lightbox: Lightbox,
    private _lighboxConfig: LightboxConfig,
    private _modalService: BsModalService) {
    this._lighboxConfig.fadeDuration = 1;
  }

  ngOnInit() {
    this.loadAttrative();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.paramSuscription.unsubscribe();
    this.attractionSuscription.unsubscribe();
    this.isDataLoaded = false;
  }
  loadAttrative() {
    this.paramSuscription = this._route.paramMap.subscribe((params) => {
      this.attractionName = params.get('attractionName');
      this.attractionSuscription = this._dataInformationService.getAtractionByName(this.attractionName).subscribe((elements) => {
        this.attraction = elements[0];
        this.attraction.videUrl = "https://www.youtube.com/embed/" + this.attraction.videUrl;
        this.loadAlbum();
        this.getSchedule();
        this.isDataLoaded = true;
      })
    })
  }


  // Abre el visor de la imagenes del atractivo
  openView(index: number): void {
    this._lightbox.open(this._albums, index);
  }
  // cierra la ventana que muestra las imagnes
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  loadAlbum() {
    this._albums = [];
    const imageArray = this.attraction.images;
    for (let index = 0; index < imageArray.length; index++) {
      const element = imageArray[index];
      const src = imageArray[index].imageUrl;
      const caption = 'Image' + imageArray[index].id;
      const thumb = 'imageArray[index].imageUrl';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };
      this._albums.push(album);
    }
  }

  getSchedule() {
    this.attractiveSchedule = [];
    this.attraction.schedule.forEach(selectSchedule => {
      let scheduleString = '';
      let activo = false;
      scheduleString = this.getDayWord(selectSchedule.day)
        + ' ' +
        moment(selectSchedule.startTime, 'HH:mm a').format('LT')
        + ' ' +
        moment(selectSchedule.endTime, 'HH:mm a').format('LT');
      const horario = {
        scheduleString: scheduleString,
        active: this.chackRunnigSchedule(
          selectSchedule.startTime,
          selectSchedule.endTime,
          selectSchedule.day
        )
      };
      this.attractiveSchedule.push(horario);
    });
    //console.log(this.attractiveSchedule);
  }

  //Indica si el sitio se encuentra abierto a la hora en que se consulta
  chackRunnigSchedule(horarioInit: string, horarioEnd: string, dia: string) {
    var moment = require('moment');
    if (this.getNumberDay(dia) == moment().isoWeekday()) {
      const horaInit = moment(horarioInit, 'HH:mm a'); //moment(this.atractivoSeleccionado.horario[0].horaInicio,'MM-DD-YYYY hh:mm A');
      const horaEnd = moment(horarioEnd, 'HH:mm a');
      const hActual = moment(moment().format('LT'), 'HH:mm a');
      return moment(hActual).isBetween(horaInit, horaEnd);
    }
    return false;
  }
  //Retorna la palabra del dia en base a una letra
  getDayWord(dayWord: string) {
    if (dayWord == 'L') {
      return 'Lunes';
    }
    if (dayWord == 'M') {
      return 'Martes';
    }
    if (dayWord == 'I') {
      return 'Miercoles';
    }
    if (dayWord == 'J') {
      return 'Jueves';
    }
    if (dayWord == 'V') {
      return 'Viernes';
    }
    if (dayWord == 'S') {
      return 'Sábado';
    }
    if (dayWord == 'D') {
      return 'Domingo';
    }
  }
  //retorna un numero que indica el dia del horario
  getNumberDay(dayWord: string) {
    if (dayWord == 'L') {
      return 1;
    }
    if (dayWord == 'M') {
      return 2;
    }
    if (dayWord == 'I') {
      return 3;
    }
    if (dayWord == 'J') {
      return 4;
    }
    if (dayWord == 'V') {
      return 5;
    }
    if (dayWord == 'S') {
      return 6;
    }
    if (dayWord == 'D') {
      return 7;
    }
  }

  validClose() {
    var countFalse = 0;
    this.attractiveSchedule.forEach(element => {
      if (element.active == false) {
        countFalse++;
      }
    })
    return countFalse == this.attractiveSchedule.length ? true : false;
  }
  averageScoreMethod(eAverageScore: number) {
    this.averageScore = eAverageScore;
  }

  /* seguir() {
    const listaPersona = this._dataStorage.getObjectValue(this._dataControl.keyPersona);

    if (this.seguidor == true) {
      this.seguidor = false;
      listaPersona.forEach(persona => {
        if (persona.id == this.persona.id) {
          if (persona.sitiosSeguidos.includes(this.atractivoSeleccionado.id)) {
            let index = persona.sitiosSeguidos.findIndex(x => x.id == this.atractivoSeleccionado.id)
            persona.sitiosSeguidos.splice(index, this.atractivoSeleccionado.id);
          }
        }
      });
    } else {
      this.seguidor = true;
      listaPersona.forEach(persona => {
        if (persona.id == this.persona) {
          if (!persona.sitiosSeguidos.includes(this.atractivoSeleccionado.id)) {
            const newFollow = {
              id: this.atractivoSeleccionado.id
            }
            persona.sitiosSeguidos.push(newFollow)
          }
        }
      });
    }
    this._dataStorage.setObjectValue(this._dataControl.keyPersona, listaPersona);
    this.getListaSeguidores();
  } */

  /* getListaSeguidores() {
    //debugger
    const users=this._dataInformationService.
    const listaPersona = this._dataStorage.getObjectValue(this._dataControl.keyPersona);
    this.atractivoSeguidores = [];
    const g = {
      id: this.atractivoSeleccionado.id
    }
    listaPersona.forEach(persona => {
      if (persona.sitiosSeguidos.includes(g)) {

        this.atractivoSeguidores.push(persona);
      }
      if (persona.id == this.persona.id) {
        this.seguidor = true;
      } else {
        this.seguidor = false;
      }
    });

  } */
}
