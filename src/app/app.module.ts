import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {Router, Routes, RouterModule} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UploadComponent } from './upload/upload.component';
import { ContentComponent2 } from './content/content.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { MessengerComponent } from './messenger/messenger.component';
import { HttpClientModule } from '@angular/common/http';
import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';

import { httpInterceptorProviders } from './auth/HttpInterceptor';
import { FileComponent } from './file/file.component';
import { SearchComponent } from './search/search.component';
import { ChatService } from './services/ChatService';

const appRoutes :Routes =[
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'sign-in',
    component: SigninComponent
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/:username',
    component: UserprofileComponent
  },
  {
    path: 'search/:searchPhrase',
    component: SearchComponent
  },
  {
    path: 'edit',
    component: EditprofileComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'messages',
    component: MessengerComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SigninComponent,
    UserprofileComponent,
    UploadComponent,
    ContentComponent2,
    EditprofileComponent,
    MessengerComponent,
    FileComponent,
    SearchComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: "reload"}),
    NgbModule.forRoot()
  ],
  providers: [httpInterceptorProviders, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
