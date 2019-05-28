import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attraction-list',
  templateUrl: './attraction-list.component.html',
  styleUrls: ['./attraction-list.component.css']
})
export class AttractionListComponent implements OnInit {
  attractivesList$: Observable<any>;

  constructor(private _router: Router, private _dataInformationService: DataInformationService) {
    this.attractivesList$ = this._dataInformationService.getAllAttractions();

  }

  ngOnInit() {
  }

  seePlace(attractiveName: string) {
    // let tempAtractivo = this.atractivos[index];
    this._router.navigate(['public/details/', attractiveName]);
  }
}
