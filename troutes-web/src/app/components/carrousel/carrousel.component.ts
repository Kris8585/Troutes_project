import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {
  news$: Observable<any>;

  constructor(private _router: Router, private _dataInformationService: DataInformationService) {
    this.news$ = _dataInformationService.getAllNews();

  }

  ngOnInit() {
  }

  seeNew(newId: number) {
    // console.log(indice);
    this._router.navigate(['secure/news/', newId]);
  }
}
