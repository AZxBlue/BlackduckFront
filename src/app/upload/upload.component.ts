import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/FileService';
import { SimpleFolder, SimpleFolder2 } from '../models/simplefolder-model';
import { UploadPicInfo } from '../models/uploadpic-model';
import { ConstantService } from '../services/ConstantService';
import { TokenStorageService } from '../services/tokenStorageService';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public imagePath: File;
  imgURL: any;
  title: string = ""
  public message: string;
  uploadVideo: boolean = false;
  newFolder: boolean = false;
  public video: File;
  hashtags: string[] = [];
  description: string = '';
  folders: SimpleFolder2[] = []
  folderPrivate: boolean = false;
  selectedFolderStr: SimpleFolder2;
  newFolderName: SimpleFolder = {
    folderName: "",
    description: "",
    folderPrivate: false
  }

  constructor(private fileService: FileService, private tokenService: TokenStorageService) { }

  ngOnInit() {
    this.folders.push(new SimpleFolder2("Default", "", null, false))
    this.getAllFolders();
    this.selectedFolderStr = this.folders[0]
  }

  getAllFolders() {
    this.fileService.getFolders().subscribe(
      data => {
        console.log(data);
        this.folders = data;

      },
      error => {
        console.log(error);
      },
      () => {
        if (this.folders.length == 0) {
          this.folders.push(new SimpleFolder2("Default", "", null, false))
        }
        else {
          this.selectedFolderStr = this.folders[0];
        }
      }
    );
  }

  addFolder() {
    this.newFolder = true;
  }
  swapToImage() {
    this.uploadVideo = false;
  }
  swapToVideo() {
    this.uploadVideo = true;
  }

  videoupload(files) {
    if (files.length === 0) {
      alert("Nie wybrano pliku!");
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/video\/*/) == null) {
      this.message = "Only videos are supported.";
      return;
    }
    var reader = new FileReader();
    this.video = files[0];
    reader.readAsDataURL(files[0]);
  }

  selectFolder(name: SimpleFolder2) {
    this.selectedFolderStr = name;
  }

  findHashtags() {
    this.hashtags.length = 0;
    var arr = this.description.split(" ");
    for (let a of arr) {
      if (a.charAt(0) == "#") {
        this.hashtags.push(a)
      }
    }

  }

  upload() {
    if (!this.uploadVideo) {
      if (this.imagePath != null) {
        this.fileService.postImage(this.imagePath).subscribe(
          data => {
            console.log(data);
            this.updateDatabase(data.filename);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
    else {
      if (this.video != null) {
        this.fileService.postImage(this.video).subscribe(
          data => {
            console.log(data);
            this.updateDatabase(data.filename);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  updateDatabase(name: string) {
    var info = new UploadPicInfo(this.title, name, null, this.selectedFolderStr.id, this.description)
    this.fileService.postPost(info).subscribe(
      data => {
        console.log(data);
        window.location.href = ConstantService.thisUrl + "/user/" + this.tokenService.getUsername();
      },
      error => {
        alert("Couldnt upload file, try again!")
      }
    );
  }

  preview(files) {
    if (files.length === 0) {
      alert("Nie wybrano pliku!");
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files[0];
    console.log(this.imagePath)
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  changeFolderPrivacy() {
    this.folderPrivate = !this.folderPrivate;
  }
  postFolder() {
    if (this.newFolderName.folderName == "") {
      this.newFolderName.folderName = "Folder (" + this.folders.length + ")"
    }
    this.newFolderName.description = "generic Description"
    this.newFolderName.folderPrivate = this.folderPrivate;
    this.fileService.postFolder(this.newFolderName).subscribe(
      data => {
        console.log(data);
        this.newFolder = false;
        this.getAllFolders();
      },
      error => {
        console.log(error);
      }
    );

  }
}
