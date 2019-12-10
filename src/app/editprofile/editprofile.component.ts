import { Component, OnInit } from '@angular/core';
import { EditPforileInfo, EditProfileInfo2 } from '../models/editprofile-model';
import { FileService } from '../services/FileService';
import { UserServices } from '../services/UserServices.1';
import { TokenStorageService } from '../services/tokenStorageService';
import { ConstantService } from '../services/ConstantService';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  constructor(private fileService: FileService, private userService: UserServices, private tokenService: TokenStorageService) { }

  site = ConstantService.baseUrl + "/file/";
  info: EditPforileInfo = {
    email: "",
    fullName: "",
    description: "",
    profilePicture: this.site + "default-profile.jpg",
    backgroundPicture: this.site + "default-profile.jpg"
  };

  BGPic: string = "";
  PPic: string = "";

  profP: string;
  bgP: string;

  imagePath: File;
  avatarPath: File;
  newPassword: '';

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    var username: string = this.tokenService.getUsername();
    this.userService.getEditProfileInfo(username).subscribe(
      data => {
        this.info = this.castToProfileInfo(data);
        console.log(this.castToProfileInfo(data));
      },
      error => {
        console.log(error);
      }
    );
  }

  castToProfileInfo(data: EditProfileInfo2): EditPforileInfo {
    var casted: EditPforileInfo = new EditPforileInfo("", "", "", "", "")
    casted.backgroundPicture = this.site + data.profileBackgroundUrl;
    this.bgP = data.profileBackgroundUrl;
    casted.profilePicture = this.site + data.profilePhotoUrl;
    this.profP = data.profilePhotoUrl;
    casted.fullName = data.fullName;
    casted.email = data.email;
    casted.description = data.description
    return casted
  }

  changeAvatar(files) {
    if (files.length === 0) {
      alert("Nie wybrano pliku!");
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert("Only images are supported.");
      return;
    }
    var reader = new FileReader();
    this.avatarPath = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.info.profilePicture = reader.result.toString();
    }
  }

  preview(files) {
    if (files.length === 0) {
      alert("Nie wybrano pliku!");
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert("Only images are supported.");
      return;
    }
    var reader = new FileReader();
    this.imagePath = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.info.backgroundPicture = reader.result.toString();
    }
  }

  confirm() {
    if (this.avatarPath != null) {
      this.fileService.postImage(this.avatarPath).subscribe(
        data => {
          this.PPic = data.filename;
          this.editBackground();
          
        },
        error => {
          console.log(error)
        }
      );
    } else {
      this.PPic = this.profP;
      this.editBackground();
    }
  }

  editBackground(){
    if (this.imagePath != null) {
      this.fileService.postImage(this.imagePath).subscribe(
        data => {
          this.BGPic = data.filename;
          this.editProfile()
        },
        error => {
          console.log(error)
        }
      );
    } else {
      this.BGPic = this.bgP;
      this.editProfile()
    }
  }
  editProfile(){
    this.userService.postEditProfile(new EditPforileInfo(this.info.email, this.info.fullName, this.info.description, this.PPic, this.BGPic)).subscribe(
      data => {
        window.location.href = ConstantService.thisUrl + "/user/"+ this.tokenService.getUsername();
      },
      error => {
        alert("Couldn't update profile! please, try again later!");
      }
    );
  }
}
