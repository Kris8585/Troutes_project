import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  latitude: number;
  longitude: number;
  attractions$: Observable<any>;
  attrSubscription: Subscription;
  iconsList: any[];
  icons: any;



  icon = {
    url: "../../../assets/icons/userLocation.png",
    scaledSize: {
      width: 20,
      height: 20
    }
  }

  constructor(private _dataInformationService: DataInformationService) {
    this.iconsList = new Array;
    this.attractions$ = this._dataInformationService.getAllAttractions();
    this.attrSubscription = this._dataInformationService.getAllAttractions().subscribe((attr) => {

      attr.forEach(touristAttr => {
        this.icon = {
          url: touristAttr.images[0].imageUrl,
          scaledSize: {
            width: 50,
            height: 50,
          }

        }

        this.iconsList.push(this.icon);

      });


    });


  }

  ngOnInit() {
    this.getUserLocation();
  }



  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
      })
    }
  }

}
