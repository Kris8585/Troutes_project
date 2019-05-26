import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attraction-admin',
  templateUrl: './attraction-admin.component.html',
  styleUrls: ['./attraction-admin.component.css']
})
export class AttractionAdminComponent implements OnInit {
  attraction$: Observable<any>;
  attractionName: string;
  constructor(private _dataInformationService: DataInformationService,
    private _activatedRoute: ActivatedRoute) {
    this.showAttraction();
  }

  ngOnInit() {
  }


  showAttraction() {
    this.attractionName = this._activatedRoute.snapshot.params['atrractionName'];
    this.attraction$ = this._dataInformationService.getAtractionByName(this.attractionName);
  }
}
