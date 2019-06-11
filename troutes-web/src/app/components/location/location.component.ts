import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { AgmInfoWindow } from '@agm/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],


})
export class LocationComponent implements OnInit {
  latitude: number;
  longitude: number;
  attractions$: Observable<any>;
  attrSubscription: Subscription;
  attrDetails: Subscription;
  searchSunscription: Subscription;

  iconsList: any[];
  icons: any;
  icon: any;
  attractionDetails: TouristAttractionsType;
  showDetails: boolean;
  showSchedule: boolean;
  currentIW: AgmInfoWindow = null;
  previousIW: AgmInfoWindow = null;
  location = {
    lat: 0,
    lng: 0,
    zoom: 13
  };

  constructor(private _dataInformationService: DataInformationService,
    private _router: Router,
    private _snotifyService: SnotifyService) {

    this.iconsList = new Array;
    this.showDetails = true;
    this.showSchedule = false;

    this.attractions$ = this._dataInformationService.getAllAttractions();
    this.attrSubscription = this._dataInformationService.getAllAttractions().subscribe((attr) => {


      attr.forEach(touristAttr => {
        this.icon = {

          url: touristAttr.images[0].imageUrl,
          scaledSize: {
            width: 60,
            height: 60,
          },

        }
        this.iconsList.push(this.icon);
      });


    });



  }



  ngOnInit() {

    this.getUserLocation();


    setTimeout(() => {
      if (this.latitude && this.longitude) {
        this.location = {
          lat: this.latitude,
          lng: this.longitude,
          zoom: 8
        }
      }

    }, 1000);

  }

  ngOnDestroy(): void {

    if (this.attrSubscription && this.attrDetails) {
      this.attrSubscription.unsubscribe();
      this.attrDetails.unsubscribe();
    }


  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  private detailsClick(attractionName: string) {
    this._router.navigate(['public/details/', attractionName]);

  }


  private searchAttraction(attrName: string) {

    if (attrName) {
      this.searchSunscription = this._dataInformationService.getAtractionByName(attrName).subscribe((attr) => {


        this.location = {
          lat: attr[0].location.latitude,
          lng: attr[0].location.longitude,
          zoom: 15
        }

        if (this.showDetails) {
          this.attractionDetails = attr[0];
        }


      });
    } else {
      this._snotifyService.warning("Digite el nombre del sitio", 'Atención');
    }

  }

  private markerClick(index: number, infoWindow: any) {

    if (!this.showDetails) {
      this.showDetails = true;
      this.showSchedule = false;
    }


    this.attrDetails = this._dataInformationService.getAllAttractions().subscribe((attr) => {
      this.attractionDetails = attr[index];
    });

    if (this.previousIW) {
      this.currentIW = infoWindow;
      this.previousIW.close();
    }
    this.previousIW = infoWindow;

  }

}
