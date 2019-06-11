import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadsService } from '../../services/uploads/uploads.service';
import { Upload } from '../../classes/uploads/upload';
import * as _ from "lodash";

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  @Input() imagesAcctions: any;
  @Input() imageAcction: string;
  @Input() isMultiLoad: boolean = true;
  //@Output() loadedImagesUrl = new EventEmitter<any>();
  selectedFiles: FileList;
  currentUpload: Upload;
  currentLoadList: Upload[] = [];
  //multipleLoadCurrent: Upload[] = [];
  imagesForSave: any[] = [];
  constructor(private _uploadService: UploadsService) { }

  ngOnInit() {
    //debugger
    this.loadDefaultImages();
  }
  loadDefaultImages(): void {
    if (this.isMultiLoad) {
      if (this.imagesAcctions) {
        this.imagesAcctions.forEach(imageCurrent => {
          const imageSelect = {
            imageUrl: imageCurrent.imageUrl,
            active: true
          }
          this.imagesForSave.push(imageSelect);
        });
      } else {
        this.imagesForSave = [];
      }
    } else {
      if (this.imageAcction) {
        const imageSelect = {
          imageUrl: this.imageAcction,
          active: true
        }
        this.imagesForSave.push(imageSelect);
      } else {
        this.imagesForSave = [];
      }
    }
  }

  detectFiles(event: any) {
    this.selectedFiles = event.target.files;
    if (this.isMultiLoad) {
      this.uploadMulti();
    } else {
      this.uploadSingle();
    }
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }
    this.currentUpload = new Upload(file);
    this._uploadService.pushUpload(this.currentUpload, 1);
  }

  uploadMulti() {
    this.currentLoadList = [];
    let files = this.selectedFiles
    let filesIndex = _.range(files.length);
    let selectSize = files.length;
    if (this._uploadService.multipleLoadCurrent.length > 0) {
      selectSize += this._uploadService.multipleLoadCurrent.length;
    }
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this._uploadService.pushUpload(this.currentUpload, selectSize);
      this.currentLoadList.push(this.currentUpload);
    });
  }

  deleteImage(image: any) {
    image.active = false;
    this._uploadService.deleteImageListControl(image.imageUrl);
  }

}
