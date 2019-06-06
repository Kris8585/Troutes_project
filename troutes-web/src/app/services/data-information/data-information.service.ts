import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataInformationService {

  state$: Subject<string>;
  constructor(private _angularFirestore: AngularFirestore) {
    this.state$ = new Subject<string>();
  }

  //----------------------------Title-----------------------------
  setState(state: string) {
    this.state$.next(state);
  }

  getState() {
    return this.state$;
  }

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
  getUsersEditors(): Observable<UserType[]> {
    return this._angularFirestore.collection<UserType>('users', ref => ref.where('role', '==', 'Editor')).valueChanges();
  }
  //----------------------------News------------------------------
  getAllNews(): Observable<NewsType[]> {
    return this._angularFirestore.collection<NewsType>('news').valueChanges();
  }
  getNewsById(newId: string): Observable<NewsType[]> {
    return this._angularFirestore.collection<NewsType>('news', ref => ref.where('newsId', '==', newId)).valueChanges();
  }

  saveNews(news: NewsType) {
    if (news.newsId && news.newsId != '') {
      this._angularFirestore.collection<NewsType>('news').doc(news.newsId).update(news);
    } else {
      news.newsId = this._angularFirestore.createId();
      this._angularFirestore.collection<NewsType>('news').doc(news.newsId).set(news);
    }
    return news.newsId;
  }
  deleteNew(news: NewsType) {
    this._angularFirestore.collection<NewsType>('news').doc(news.newsId).delete();
  }
  //--------------------------Attractions-------------------------
  getAllAttractions(): Observable<TouristAttractionsType[]> {
    return this._angularFirestore.collection<TouristAttractionsType>('attractions').valueChanges();
  }
  getAtractionByName(name: string): Observable<TouristAttractionsType[]> {
    return this._angularFirestore.collection<TouristAttractionsType>('attractions', ref => ref.where('name', '==', name)).valueChanges();
  }
  getAtractionById(attrId: string): Observable<TouristAttractionsType[]> {
    return this._angularFirestore.collection<TouristAttractionsType>('attractions', ref => ref.where('attractionId', '==', attrId)).valueChanges();
  }
  getAtractionByEditorId(editorId: string): Observable<TouristAttractionsType[]> {
    return this._angularFirestore.collection<TouristAttractionsType>('attractions', ref => ref.where('editorId', '==', editorId)).valueChanges();
  }
  saveAttractive(attractive: TouristAttractionsType) {
    if (attractive.attractionId && attractive.attractionId != '') {
      this._angularFirestore.collection<TouristAttractionsType>('attractions').doc(attractive.attractionId).update(attractive);
    } else {
      attractive.attractionId = this._angularFirestore.createId();
      this._angularFirestore.collection<TouristAttractionsType>('attractions').doc(attractive.attractionId).set(attractive);
    }
    return attractive.attractionId;
  }
  deleteAttractive(attractive: TouristAttractionsType) {
    this._angularFirestore.collection<TouristAttractionsType>('attractions').doc(attractive.attractionId).delete();
  }

  //---------------------------Followers---------------------------

  getFollowers(attractionId: string): Observable<FollowerType[]> {
    return this._angularFirestore.collection<FollowerType>('followers', ref => ref.where('attractionId', '==', attractionId)).valueChanges();
  }
  getFollowedSites(userId: string): Observable<FollowerType[]> {
    return this._angularFirestore.collection<FollowerType>('followers', ref => ref.where('userId', '==', userId)).valueChanges();
  }
  deleteFollowSite(follower: FollowerType) {
    return this._angularFirestore.collection<FollowerType>('followers').doc(follower.followerId).delete();
  }
  setFollow(follower: FollowerType) {
    follower.followerId = this._angularFirestore.createId();
    this._angularFirestore.collection<TouristAttractionsType>('followers').doc(follower.followerId).set(follower);
    return follower.followerId;
  }
  //---------------------------Comments---------------------------
  getAllComments(): Observable<CommentaryType[]> {
    return this._angularFirestore.collection<CommentaryType>('comments').valueChanges();
  }
  getCommentById(commentId: number): Observable<CommentaryType[]> {
    return this._angularFirestore.collection<CommentaryType>('comments', ref => ref.where('commentId', '==', commentId)).valueChanges();
  }
  getCommentByUserId(userId: string): Observable<CommentaryType[]> {
    return this._angularFirestore.collection<CommentaryType>('comments', ref => ref.where('userId', '==', userId)).valueChanges();
  }
  getCommentByAttractionId(attractionId: string): Observable<CommentaryType[]> {
    return this._angularFirestore.collection<CommentaryType>('comments', ref => ref.where('attractiveId', '==', attractionId)).valueChanges();
  }
  //---------------------------Services---------------------------
  getAllServices(): Observable<ServiceType[]> {
    return this._angularFirestore.collection<ServiceType>('services').valueChanges();
  }

}
