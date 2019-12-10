import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServices } from "../services/UserServices.1";
import { userProfileResponse } from '../models/userprofile-response';
import { SimplePost } from '../models/simplepost-model';
import { FileComponent } from '../file/file.component';
import { ConstantService } from '../services/ConstantService';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})

export class UserprofileComponent implements OnInit, AfterViewInit {
  view: boolean;
  public fcomp: any;
  message: string = "";
  canLoadMore: boolean = true;
  page = 0;
  posts: SimplePost[];
  site = ConstantService.baseUrl + "/file/";
  path: string = ""
  userData: userProfileResponse = {
    username: "",
    fullName: "",
    description: "",
    profileBackgroundUrl: "default-profile.jpg",
    profilePhotoUrl: "default-profile.jpg",
    profileThumbnail: "default-profile.jpg"
  }
  temp: FileComponent;

  @HostListener("window:scroll", ["$event"])
  onWindowScroll($event) {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      console.log("damn");
    }
  }

  @ViewChild(FileComponent, { static: false }) content: FileComponent;

  constructor(private userService: UserServices, private route: ActivatedRoute, private changeDetector: ChangeDetectorRef) {
    this.route.params.subscribe(params => this.path = params['username'])
  }

  ngOnInit() {
    if (this.path != "") {
      this.userService.getUserProfileInfo(this.path).subscribe(
        data => {
          this.userData = data
        },
        error => {
          alert("something wronk.")
        }
      );
      this.userService.getUserPosts(this.path).subscribe(
        data => {
          this.posts = data;
        },
        error => {
          alert("something wronk.")
        }
      )
    }
  }

  ngAfterViewInit() {
  }

  turnView(post: SimplePost) {
    this.view = true;
    this.changeDetector.detectChanges();
    this.content.loadImage(post.id)
    console.log(post.id)
  }

  public turnOffView() {
    this.view = false;
    this.changeDetector.detectChanges();
  }


}
