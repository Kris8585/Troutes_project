import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataInformationService {
  constructor(private _angularFirestore: AngularFirestore) { }

  //----------------------------User------------------------------
  getUserByEmail(email: string): Observable<UserType[]> {
    return this._angularFirestore.collection<UserType>('users', ref => ref.where('email', '==', email)).valueChanges();
  }
  getUserByRole(role: string): Observable<UserType[]> {
    return this._angularFirestore.collection<UserType>('users', ref => ref.where('role', '==', role)).valueChanges();
  }
  getUserById(userId: string): Observable<UserType[]> {
    return this._angularFirestore.collection<UserType>('users', ref => ref.where('userId', '==', userId)).valueChanges();
  }
  //----------------------------News------------------------------
  getAllNews(): Observable<NewsType[]> {
    return this._angularFirestore.collection<NewsType>('news').valueChanges();
  }
  getNewsById(newId: string): Observable<NewsType[]> {
    return this._angularFirestore.collection<NewsType>('news', ref => ref.where('newsId', '==', newId)).valueChanges();
  }
  //--------------------------Attractions-------------------------
  getAllAttractions(): Observable<TouristAttractionsType[]> {
    return this._angularFirestore.collection<TouristAttractionsType>('attractions').valueChanges();
  }
  getAtractionByName(name: string): Observable<TouristAttractionsType[]> {
    return this._angularFirestore.collection<TouristAttractionsType>('attractions', ref => ref.where('name', '==', name)).valueChanges();
  }
  //---------------------------Followers---------------------------

  getFollowers(attractionId: number): Observable<FollowerType[]> {
    return this._angularFirestore.collection<FollowerType>('followers', ref => ref.where('attractionId', '==', attractionId)).valueChanges();
  }
  getFollowedSites(userId: number): Observable<FollowerType[]> {
    return this._angularFirestore.collection<FollowerType>('followers', ref => ref.where('userId', '==', userId)).valueChanges();
  }
  //---------------------------Comments---------------------------
  getAllComments(): Observable<CommentaryType[]> {
    return this._angularFirestore.collection<CommentaryType>('comments').valueChanges();
  }
  getCommentById(commentId: number): Observable<CommentaryType[]> {
    return this._angularFirestore.collection<CommentaryType>('comments', ref => ref.where('commentId', '==', commentId)).valueChanges();
  }
  getCommentByUserId(userId: number): Observable<CommentaryType[]> {
    return this._angularFirestore.collection<CommentaryType>('comments', ref => ref.where('userId', '==', userId)).valueChanges();
  }
  getCommentByAttractionId(attractionId: number): Observable<CommentaryType[]> {
    return this._angularFirestore.collection<CommentaryType>('comments', ref => ref.where('attractionId', '==', attractionId)).valueChanges();
  }
}
