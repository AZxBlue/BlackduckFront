import { Component, OnInit, ComponentFactoryResolver, AfterViewInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { UserServices } from '../services/UserServices.1';
import { TokenStorageService } from '../services/tokenStorageService';
import { ChatService } from '../services/ChatService';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import { MessageModel } from '../models/message-model';
import { MessengerUserInfo, Conversation, MessengerUserSidebarInfo } from '../models/messenger-user-model';
import { MessageResponse } from '../models/getMessagesRequest';
import { ConstantService } from '../services/ConstantService';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;
  message: string = "";
  search = "";
  showErr: boolean = false;
  firstConf = false;
  constructor(private userService: UserServices, private tokenService: TokenStorageService) { }
  container: HTMLElement;

  private serverUrl =  ConstantService.baseUrl +'/socket/'
  private stompClient;
  messages: MessageResponse[];
  selectedConv: Conversation;
  site =  ConstantService.baseUrl +"/file/"

  searchResults: MessengerUserSidebarInfo[];

  userInfo: MessengerUserInfo = { fullName: "Miranda", profilePhotoUrl: "default-profile.jpg", profileBackgroundUrl: "default-profile.jpg", username: "unem" }

  users: Conversation[];

  scrollToBottom() {         
    console.log("botom");
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  } catch(err) { }    
  }  

  public initializeWebSocketConnection(uuuuid: string) {
    var ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    console.log(uuuuid)
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe("/topic/" + uuuuid, (message) => {
        that.getConversations()
        that.playAudio()
      });
    });
  }

  playAudio() {
    let audio = new Audio();
    audio.src = "../../../assets/blip.ogg";
    audio.load();
    audio.play();
  }

  getMessages() {
    this.userService.getMessages(this.selectedConv.user2.username).subscribe(
      data => {
        this.messages = data;
        this.showErr = false;
      },
      error => {
        console.log(error)
        this.showErr = true;
      }
    );
  } 
  sendMSG(message) {
    this.stompClient.send("/app/send/message", {}, message);
    $('#input').val('');
  }

  ngOnInit() {
    this.userService.getMessengerUserInfo(this.tokenService.getUsername()).subscribe(
      data => {
        this.userInfo = data;
        this.userInfo.username = this.tokenService.getUsername();
        this.initializeWebSocketConnection(this.tokenService.getUUID())
        this.getConversations()
      },
      error => {
        console.log(error)
        this.showErr = true;
      }
    );
  }

  getConversations() {
    this.userService.getExistingConversations().subscribe(
      data => {
        this.users = data.reverse();
        var usr: MessengerUserSidebarInfo;
        for (let user of this.users) {
          if (user.user2.fullName == this.userInfo.fullName) {
            usr = user.user1;
            user.user1 = user.user2;
            user.user2 = usr;
          }
        }
        if (this.users.length > 0) {
          if (this.selectConv == null) {
            this.selectedConv = this.users[0]
          }
          this.getMessages();
        }
        console.log(this.selectedConv)
      },
      error => {
        console.log(error)
        this.showErr = true;
      }
    );
  }

  searchUsers() {
    if (this.search != "") {
      this.userService.getSearchedUsers(this.search).subscribe(
        data => {
          this.searchResults = data;
        },
        error => {
          console.log(error)
          this.showErr = true;
        }
      );
    }
  }

  sendMessage() {
    this.userService.postMessage(new MessageModel(this.message, this.selectedConv.user2.username))
    .subscribe(
      data => {
        this.getMessages();
        this.message = "";
        if (this.firstConf) {
          this.getConversations();
          this.firstConf = false;
        }
      },
      error => {
        this.showErr = true;
      }
    );
  }

  selectConv(conv: Conversation) {
    console.log(conv)
    this.selectedConv = conv;
    this.getMessages()
  }

  createConv(un: MessengerUserSidebarInfo) {
    this.selectedConv = new Conversation(un);
    this.search = "";
    this.firstConf = true;
    alert(this.selectedConv.user1.fullName);
  }
}
