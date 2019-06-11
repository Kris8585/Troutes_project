import { Injectable } from '@angular/core';
import { Upload } from '../../classes/uploads/upload';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { SnotifyService } from 'ng-snotify';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  constructor(private _angularFirestore: AngularFirestore, private _snotifyService: SnotifyService
  ) { }
  private basePath: string = '/uploadsTest';
  multipleLoadCurrent: Upload[] = [];
  deleteIMageList: string[] = [];
  pushUpload(upload: Upload, listSize: number) {

    let storageRef = firebase.storage().ref();
    let nameId = Math.random().toString(36).substring(2);
    upload.name = upload.name + "_" + nameId;
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        this._snotifyService.warning('Se ha presentado el siguiente error:' + error, 'Atención');
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          upload.url = downloadURL;
          upload.name = upload.file.name;
          this.multipleLoadCurrent.push(upload);
          if (this.multipleLoadCurrent.length == listSize) {
            Swal.fire({
              type: 'success',
              title: 'Operación exitosa',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }
    );
  }

  private saveFileData(upload: Upload, attractionId: string) {

    this._angularFirestore.collection<TouristAttractionsType>('attractions').ref.where('attractionId', '==', attractionId).get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach(doc => {
          debugger
          var elementRef = this._angularFirestore.collection('attractions').doc(doc.id);
          let nuevoArregloDeImagenes = doc.get('images');

          nuevoArregloDeImagenes.push(upload.url);

          return elementRef.update({
            imageUrl: nuevoArregloDeImagenes
          }).then(() => {
            this._snotifyService.success('Se ha actualizado la información del atractivo', 'Información');
          }).catch((error) => {
            this._snotifyService.warning('Se ha presentado el siguiente inconveniente al guardar:' + error, 'Atención');

          });

        });
      });

  }

  deleteUpload(upload: Upload) {
    this.deleteFileFirestore(upload.$key)
      .then(() => {
        this.deleteFileStorage(upload.name)
      })
      .catch(error => console.log(error))
  }
  deleteImageListControl(urlImage: string) {
    this.deleteIMageList.push(urlImage);
  }
  private deleteFileFirestore(id: string) {
    return this._angularFirestore.collection<Upload>('documents').doc(id).delete();
  }

  private deleteFileStorage(name: string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}
