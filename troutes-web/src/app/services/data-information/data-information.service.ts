import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataInformationService {

  constructor(private _angularFirestore: AngularFirestore ) { }

  // User Information
  getUserByEmail(email: string): Observable<UserType[]> {
    return  this._angularFirestore.collection<UserType>('users', ref => ref.where('email', '==', email)).valueChanges();
   }



   
  
}
