import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShceduleService } from "../../services/schedule/shcedule.service"
@Component({
  selector: 'app-schedule-pick',
  templateUrl: './schedule-pick.component.html',
  styleUrls: ['./schedule-pick.component.css']
})

export class SchedulePickComponent implements OnInit {
  @Input() horarioAtractivo: any;
  @Output() oHorarioSelecionado = new EventEmitter<any>();
  isMeridian = true;
  mytime: Date = new Date();

  scheduleList: any[] = [{
    "day": 'L',
    "active": false,
    "startTime": "08:00",
    "endTime": "17:00"
  },
  {
    "day": 'M',
    "active": false,
    "startTime": "08:00",
    "endTime": "17:00"
  },
  {
    "day": 'I',
    "active": false,
    "startTime": "08:00",
    "endTime": "17:00"
  },
  {
    "day": 'J',
    "active": false,
    "startTime": "08:00",
    "endTime": "17:00"
  },
  {
    "day": 'V',
    "active": false,
    "startTime": "08:00",
    "endTime": "17:00"
  },
  {
    "day": 'S',
    "active": false,
    "startTime": "08:00",
    "endTime": "17:00"
  },
  {
    "day": 'D',
    "active": false,
    "startTime": "08:00",
    "endTime": "17:00"
  }

  ];

  diaMostrar: any[] = [{}];
  constructor(private _scheduleServices: ShceduleService) { }
  ngOnInit() {
    if (this.horarioAtractivo.length > 0) {
      this.asignarHorarios();
    }

    else {
      this.asignarVacio();
    }
    this.checkSchedules();
  }

  asignarVacio() {
    var moment = require('moment');
    this.scheduleList.forEach(dayList => {
      dayList.active = false;
      dayList.startTime = "";
      dayList.endTime = "";
    });
  }

  asignarHorarios() {
    var moment = require('moment');
    this.scheduleList.forEach(dayList => {
      this.horarioAtractivo.forEach(hAtractivo => {
        if (dayList.day == hAtractivo.day) {
          dayList.active = true;
          dayList.startTime = hAtractivo.startTime;
          dayList.endTime = hAtractivo.endTime;
        }
      });
    });
  }

  onDiaSelect(select: any) {
    this.checkSchedules();
  }

  checkSchedules() {
    let newSchedule = [];
    let index = 0;

    this.scheduleList.forEach((dayList) => {
      if (dayList.active) {
        if (dayList.startTime != '' && dayList.endTime != '') {
          index++;
          const horario = {
            schId: index,
            day: dayList.day,
            startTime: dayList.startTime,
            endTime: dayList.endTime
          }
          newSchedule.push(horario);
        }
      }
    });
    this.oHorarioSelecionado.emit(newSchedule);
  }
}