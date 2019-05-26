import { Injectable } from '@angular/core';
import { AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private _angularFireStorage:AngularFireStorage) { }

  uploadProgress: Observable<number>;
  urlImage:Observable<string>;

  pushUpload(e){
   
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this._angularFireStorage.ref(filePath);
    const task = this._angularFireStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();

  }


  getUrlImage(){
    return this.urlImage;
  }
    
}
