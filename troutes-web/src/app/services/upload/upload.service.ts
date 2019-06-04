import { Injectable } from '@angular/core';
import { AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators'
import { Observable } from 'rxjs';
import { UploadClass } from 'src/app/models/upload.class';
import { AngularFirestore } from '@angular/fire/firestore';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private _angularFireStorage:AngularFireStorage,
              private _angularFirestore:AngularFirestore,
              private _snotifyService:SnotifyService) { }

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

  // pushUpload(upload: UploadClass, elementoNombre: string) {

  //   let storageRef = firebase.storage().ref();
  //   let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

  //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //     (snapshot) => {
  //       upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     },
  //     (error) => {
  //       this.snotifyService.warning('Se ha presentado el siguiente error:' + error, 'Atención');
  //     },
  //     () => {
  //       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

  //         upload.url = downloadURL;
  //         upload.name = upload.file.name;
  //         this.saveFileData(upload, elementoNombre);

  //       });

  //     }
  //   );
  // }





  private saveFileData(upload: UploadClass, userId: string) {

    this._angularFirestore.collection<UserType>('users').ref.where('userId', '==', userId).get()
     .then(  (querySnapshot) => {
       
      querySnapshot.docs.forEach(doc => {
        var elementRef = this._angularFirestore.collection('users').doc(doc.id);
      
        let nuevoArregloDeImagenes= doc.get('profile_photo');
        nuevoArregloDeImagenes.push(upload.url);
       
        return elementRef.update({ 
         imagenes: nuevoArregloDeImagenes
        }).then(()=>{
          this._snotifyService.success('Se ha actualizado la información del elemento','Información');
        }).catch((error)=>{
          this._snotifyService.warning('Se ha presentado el siguiente inconveniente al guardar:'+ error,'Atención');
      
        });

      });
    });
  
  }

 
 
  // private deleteFileFirestore(id: string) {
  //   return this._angularFirestore.collection<UploadClass>('documents').doc(id).delete();
  // }



 
  // deleteUpload(upload: UploadClass) {
  //   this.deleteFileFirestore(upload.$key)
  //     .then(() => {
  //       this.deleteFileStorage(upload.name)
  //     })
  //     .catch(error => console.log(error))
  // }

  

  // private deleteFileStorage(name: string) {
  //   let storageRef = firebase.storage().ref();
  //   storageRef.child(`${this.basePath}/${name}`).delete()
  // }




  getUrlImage(){
    return this.urlImage;
  }
    
}
