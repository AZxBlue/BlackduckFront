import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServices } from '../services/UserServices.1';
import { MessengerUserSidebarInfo } from '../models/messenger-user-model';
import { SimplePost } from '../models/simplepost-model';
import { FileComponent } from '../file/file.component';
import { ConstantService } from '../services/ConstantService';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserServices, private changeDetector : ChangeDetectorRef) {
    this.route.params.subscribe(params => this.path = params['searchPhrase'])
  }

  path: string = ""
  view: boolean;
  searchText = ""
  site = ConstantService.baseUrl + "/file/"
  bgImage: string;
  temp: FileComponent;

  @ViewChild(FileComponent, {static: false}) content: FileComponent;
  
  users: MessengerUserSidebarInfo[];
  imgs: SimplePost[];
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.users = null;
      this.bgImage = null;
      this.imgs = null;
      if (this.path.charAt(0) == "@") {
        this.searchText = this.path.substr(1)
        this.searchUsers(this.searchText)
      } else {
        this.searchText = this.path
        this.searchPosts(this.searchText)
      }

    });
  }

  searchPosts(post: string) {
    this.userService.getSearchedPosts(post).subscribe(
      data => {
        this.imgs = data;
        if(this.imgs.length>0){
          this.bgImage = this.imgs[0].contentUrl;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  searchUsers(username: string) {
    this.userService.getSearchedUsers(username).subscribe(
      data => {
        this.users = data;
        if(this.users.length>0){
          this.bgImage = this.users[0].profilePhotoUrl;
        }
      },
      error => {
        console.log(error);
      }
    );
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
