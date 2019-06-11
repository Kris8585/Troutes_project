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
  attrDetails: Subscription;
  searchSunscription: Subscription;
  attractionDetails: TouristAttractionsType;
  showDetails: boolean;
  showSchedule: boolean;
  showSearching: boolean;
  searchSite: string;
  site: string;
  location: any;

  constructor(private _dataInformationService: DataInformationService,
    private _router: Router,
    private _snotifyService: SnotifyService) {

    this.location = {
      lat: 0,
      lng: 0,
      zoom: 13
    };

    this.showDetails = true;
    this.showSchedule = false;
    this.showSearching = false;
    this.latitude = 0;
    this.longitude = 0;
    this.attractions$ = this._dataInformationService.getAllAttractions();

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

    if (this.attrDetails) {

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

  private closeClick() {
    this.showSearching = false;
    this.showDetails = false;
    this.location = {
      lat: this.latitude,
      lng: this.longitude,
      zoom: 8
    }


  }


  private searchAttraction(attrName: string) {

    if (attrName) {
      this.searchSunscription = this._dataInformationService.getAtractionByName(attrName).subscribe((attr) => {

        if (attr.length <= 0) {
          this.searchSite = "' " + attrName.toString() + " '" + ' no encontrado';
          this.showSearching = true;
        } else {
          if (attr[0].active) {
            this.searchSite = attrName.toString();
            this.showSearching = true;
            this.showDetails = true;
            this.location = {
              lat: attr[0].location.latitude,
              lng: attr[0].location.longitude,
              zoom: 15
            }
          }
        }

        if (this.showDetails) {
          this.attractionDetails = attr[0];
        }


      });
    } else {
      this._snotifyService.warning("Digite el nombre del sitio", 'Atención');
    }
    this.site = "";
  }

  private markerClick(index: number) {

    if (!this.showDetails) {
      this.showDetails = true;
      this.showSchedule = false;
    }


    this.attrDetails = this._dataInformationService.getAllAttractions().subscribe((attr) => {
      this.attractionDetails = attr[index];
    });


  }

}
