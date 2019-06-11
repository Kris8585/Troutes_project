import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Lightbox, LightboxConfig, IAlbum } from 'ngx-lightbox';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
import { Subscription } from 'rxjs';

import { LoginService } from 'src/app/services/login/login.service';
import { ShceduleService } from "../../services/schedule/shcedule.service";
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  attractionId: number;
  attractionName: string;
  attraction: TouristAttractionsType;
  paramSuscription: Subscription;
  attractionSuscription: Subscription;
  followersSuscription: Subscription;
  attractiveSchedule: any[] = [];
  atractivoSeguidores$: UserType[] = [];
  isDataLoaded: boolean = false;
  averageScore: number = 0;
  isOpen = false;

  modalRef: BsModalRef;
  valueWidth = false;
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };
  isfollow: boolean = false;
  currentFollower: FollowerType;

  /*   sesionInicada: boolean = false;
    sesionUsarioId: number = 0;
    sesionRol: number; */
  persona: UserType;
  currentUser: UserType;
  showReview: boolean;
  user: UserType;
  public _albums: Array<IAlbum>;
  followersCount: number = 0;
  constructor(private _route: ActivatedRoute,
    private _dataInformationService: DataInformationService,
    private _loginService: LoginService,
    private _lightbox: Lightbox,
    private _scheduleService: ShceduleService,
    private _lighboxConfig: LightboxConfig,
    private _modalService: BsModalService) {
    this._lighboxConfig.fadeDuration = 1;
  }

  ngOnInit() {
    this.currentUser = this._loginService.getCurrentUser();
    this.loadAttrative();

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.paramSuscription.unsubscribe();
    this.attractionSuscription.unsubscribe();
    this.followersSuscription.unsubscribe();
    this.isDataLoaded = false;
  }
  loadAttrative() {
    this.paramSuscription = this._route.paramMap.subscribe((params) => {
      this.attractionName = params.get('attractionName');
      this.attractionSuscription = this._dataInformationService.getAtractionByName(this.attractionName).subscribe((elements) => {
        this.attraction = elements[0];
        this.attraction.videUrl = "https://www.youtube.com/embed/" + this.attraction.videUrl;
        this.loadAlbum();
        this.attractiveSchedule = this._scheduleService.getSchedule(this.attraction.schedule);
        this.isDataLoaded = true;
        this.getCountFollow();
      })
    })
  }


  // Abre el visor de la imagenes del atractivo
  openView(index: number): void {
    this._lightbox.open(this._albums, index);
  }
  // cierra la ventana que muestra las imagnes
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  loadAlbum() {
    this._albums = [];
    const imageArray = this.attraction.images;
    for (let index = 0; index < imageArray.length; index++) {
      const element = imageArray[index];
      const src = imageArray[index].imageUrl;
      const caption = 'Image' + index;
      const thumb = 'imageArray[index].imageUrl';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };
      this._albums.push(album);
    }
  }

  averageScoreMethod(eAverageScore: number) {
    this.averageScore = eAverageScore;
  }

  follow() {
    if (this.isfollow) {
      this._dataInformationService.deleteFollowSite(this.currentFollower);
    } else {
      const newFollow: FollowerType = {
        'followerId': '',
        'userId': this.currentUser.userId,
        'attractionId': this.attraction.attractionId
      }
      this._dataInformationService.setFollow(newFollow);
    }
  }
  getCountFollow() {
    this.followersSuscription = this._dataInformationService.getFollowers(this.attraction.attractionId).subscribe((followers) => {
      this.followersCount = followers.length;
      try {
        this.isfollow = followers.some(followUser => followUser.userId === this.currentUser.userId && followUser.attractionId == this.attraction.attractionId);
        this.currentFollower = followers.find(followUser => followUser.userId === this.currentUser.userId && followUser.attractionId == this.attraction.attractionId);
      } catch (error) {
        this.isfollow = false;
        this.currentFollower = null;
      }

    });
  }
  /* seguir() {
    const listaPersona = this._dataStorage.getObjectValue(this._dataControl.keyPersona);

    if (this.seguidor == true) {
      this.seguidor = false;
      listaPersona.forEach(persona => {
        if (persona.id == this.persona.id) {
          if (persona.sitiosSeguidos.includes(this.atractivoSeleccionado.id)) {
            let index = persona.sitiosSeguidos.findIndex(x => x.id == this.atractivoSeleccionado.id)
            persona.sitiosSeguidos.splice(index, this.atractivoSeleccionado.id);
          }
        }
      });
    } else {
      this.seguidor = true;
      listaPersona.forEach(persona => {
        if (persona.id == this.persona) {
          if (!persona.sitiosSeguidos.includes(this.atractivoSeleccionado.id)) {
            const newFollow = {
              id: this.atractivoSeleccionado.id
            }
            persona.sitiosSeguidos.push(newFollow)
          }
        }
      });
    }
    this._dataStorage.setObjectValue(this._dataControl.keyPersona, listaPersona);
    this.getListaSeguidores();
  } */

  /* getListaSeguidores() {
    //debugger
    const users=this._dataInformationService.
    const listaPersona = this._dataStorage.getObjectValue(this._dataControl.keyPersona);
    this.atractivoSeguidores = [];
    const g = {
      id: this.atractivoSeleccionado.id
    }
    listaPersona.forEach(persona => {
      if (persona.sitiosSeguidos.includes(g)) {

        this.atractivoSeguidores.push(persona);
      }
      if (persona.id == this.persona.id) {
        this.seguidor = true;
      } else {
        this.seguidor = false;
      }
    });

  } */
}
