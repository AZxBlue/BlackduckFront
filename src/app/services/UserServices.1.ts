import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpOptions } from './UserServices';
import { userProfileResponse } from '../models/userprofile-response';
import { SimplePost, Post } from '../models/simplepost-model';
import { commentInfo } from '../models/comment-model';
import { EditPforileInfo, EditProfileInfo2 } from '../models/editprofile-model';
import { MessageModel } from '../models/message-model';
import { Conversation, MessengerUserInfo, MessengerUserSidebarInfo } from '../models/messenger-user-model';
import { GetMessagesRequest, MessageResponse } from '../models/getMessagesRequest';
import { RateRequest } from '../models/Rate-model';
import { ConstantService } from './ConstantService';

@Injectable({
    providedIn: 'root'
})

export class UserServices {
    private userprofileURL =  ConstantService.baseUrl + "/user/";
    private userPostsURL =  ConstantService.baseUrl + "/posts/user/";
    private postURL =  ConstantService.baseUrl + "/posts/post";
    private commentURL =  ConstantService.baseUrl + "/comments";
    private editProfileURL =  ConstantService.baseUrl + "/editProfile"
    private sendMessageURL =  ConstantService.baseUrl + "/chat/sendMessage"
    private getMessagesURL =  ConstantService.baseUrl + "/chat/messages"
    private getConversationsURL =  ConstantService.baseUrl + "/chat/conversations"
    private searchUserURL =  ConstantService.baseUrl + "/search/"
    private searchPostURL =  ConstantService.baseUrl + "/posts/search/"
    private addRateURL =  ConstantService.baseUrl + "/rates"
    private postsURL = ConstantService.baseUrl +"/posts?page="

    constructor(private http: HttpClient) {
    }

    rateImage(rate: RateRequest): Observable<number>{
        return this.http.post<number>(this.addRateURL, rate, httpOptions);
    }

    getSearchedPosts(username: string): Observable<SimplePost[]>{
        return this.http.get<SimplePost[]>(this.searchPostURL + username, httpOptions);
    }

    getSearchedUsers(username: string): Observable<MessengerUserSidebarInfo[]>{
        return this.http.get<MessengerUserSidebarInfo[]>(this.searchUserURL + username, httpOptions);
    }
    getExistingConversations(): Observable<Conversation[]> {
        return this.http.get<Conversation[]>(this.getConversationsURL, httpOptions);
    }

    getMessages(info: string): Observable<MessageResponse[]> {
        return this.http.post<MessageResponse[]>(this.getMessagesURL, new GetMessagesRequest(info), httpOptions);
    }

    postMessage(info: MessageModel): Observable<string> {
        return this.http.post<string>(this.sendMessageURL, info, httpOptions)
    }
    getUserProfileInfo(info: string): Observable<userProfileResponse> {
        return this.http.get<userProfileResponse>(this.userprofileURL + info, httpOptions);
    }
    getMessengerUserInfo(info: string): Observable<MessengerUserInfo> {
        return this.http.get<MessengerUserInfo>(this.userprofileURL + info, httpOptions);
    }
    getUserPosts(info: string): Observable<SimplePost[]> {
        return this.http.get<SimplePost[]>(this.userPostsURL + info, httpOptions);
    }
    getPost(info: number): Observable<Post> {
        return this.http.get<Post>(this.postURL + "?id=" + info, httpOptions);
    }

    postComment(info: commentInfo): Observable<Comment> {
        return this.http.post<Comment>(this.commentURL, info, httpOptions);
    }

    postEditProfile(info: EditPforileInfo): Observable<string> {
        return this.http.post<string>(this.editProfileURL, info, httpOptions);
    }

    getEditProfileInfo(info: string): Observable<EditProfileInfo2> {
        return this.http.get<EditProfileInfo2>(this.userprofileURL + info, httpOptions);
    }
}
