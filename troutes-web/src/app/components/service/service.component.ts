import { Component, OnInit } from '@angular/core';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  services$: Observable<any>;
  

  constructor(private _dataInformationService:DataInformationService) { }

  ngOnInit() {
    this.services$ = this._dataInformationService.getAllServices();
  }


  
}
