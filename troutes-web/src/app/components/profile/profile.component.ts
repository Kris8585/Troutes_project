import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$: Observable<any>;
  userId: string;

  constructor(private _activatedRoute: ActivatedRoute, private _dataInformationService: DataInformationService) {
    //this.showProfileUser();

  }

  ngOnInit() {
  }

  /* showProfileUser()
  {
    this.userId = this._activatedRoute.snapshot.params['userId'];
    this.user$ = this._dataInformationService.getUserById(this.userId);
  } */

}
