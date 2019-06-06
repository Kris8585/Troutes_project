import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class ShceduleService {

  attractiveSchedule: any[] = [];
  constructor() { }

  getSchedule(attraction: any) {
    this.attractiveSchedule = [];
    attraction.forEach(selectSchedule => {
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
    return this.attractiveSchedule;
  }

  //Indica si el sitio se encuentra abierto a la hora en que se consulta
  chackRunnigSchedule(horarioInit: string, horarioEnd: string, dia: string) {
    var moment = require('moment');
    if (this.getNumberDay(dia) == moment().isoWeekday()) {
      const horaInit = moment(horarioInit, 'HH:mm a');
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
}
