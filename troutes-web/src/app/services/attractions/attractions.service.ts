import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {

  constructor(private _angularFirestore: AngularFirestore) {

  }


  /*   getFollowSites(userId:string){
      return this._angularFirestore.collection<UserType>('followers', ref => ref.where('userId', '==', userId)).valueChanges();
    }
  
    getAttractionsById(attractionId:string){
  
    } */
}
