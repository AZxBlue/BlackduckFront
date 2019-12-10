import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/tokenStorageService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  info: any;
  constructor(private token: TokenStorageService,private router: Router) { }
  searchPhrase: string = "";
  loggedIn: boolean = false;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername()
    };
  }

  search2() {
    if(this.searchPhrase != ""){
    this.router.navigateByUrl('/search/'+ this.searchPhrase);
    }
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
