import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserprofileComponent } from '../userprofile/userprofile.component';
import { UserServices } from '../services/UserServices.1';
import { Post } from '../models/simplepost-model';
import { commentInfo } from '../models/comment-model';
import { RateRequest } from '../models/Rate-model';
import { ConstantService } from '../services/ConstantService';
import { VgAPI } from 'videogular2/compiled/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  api: VgAPI;
  site = ConstantService.baseUrl + "/file/"
  blank = "";
  comment: string = "";
  time =0;
  currentPost: Post = {
    title: "",
    contentUrl: "",
    comments: null,
    id: 0,
    contentType: "",
    author: {
      fullName: "",
      profilePhotoUrl: "",
      username: ""
    },
    creationDate: null,
    description: "",
    rate: 0
  };
  constructor(private viewContainerRef: ViewContainerRef, private userService: UserServices) { }

  ngOnInit() {
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
  }

  postComment() {
    if (this.comment != "") {
      if (this.api != null) {
        var time = this.api.getDefaultMedia().currentTime * 1000;
        if (time != 0) {
          this.time = time;
          this.time.toPrecision(1);
        }
      }
      this.userService.postComment(new commentInfo(this.currentPost.id, this.comment, this.time)).subscribe(
        data => {
          this.comment = ""
          this.currentPost.comments.push(data)
        },
        error => {
          console.log(error)
        }
      );
    }
  }
  loadImage(id: number) {
    this.userService.getPost(id).subscribe(
      data => {
        this.currentPost = data;
      },
      error => {
        console.log(error)
      }
    );
  }
  exit() {
    this.getParentComponent().turnOffView();
  }

  getParentComponent(): UserprofileComponent {
    return this.viewContainerRef['_data'].componentView.component.viewContainerRef['_view'].component
  }

  rate(value: number) {
    this.userService.rateImage(new RateRequest(value, this.currentPost.id)).subscribe(
      data => {
        this.currentPost.rate = data;
      },
      error => {
        console.log(error)
      }
    );
  }

  goTo(value: number){
    this.api.currentTime = value/10000;
  }
}
