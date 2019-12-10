export class GetMessagesRequest{
    toUserUsername: string;
     constructor(toUserUsername: string){
         this.toUserUsername = toUserUsername;
     }
}

export class MessageResponse{
    message: string;
    fromUser: SimpleUser;
    toUser: SimpleUser;
    id: number;

}

export class SimpleUser{
    username: string;
    fullName: string;
    profilePhotoUrl: string;
    lastActivity: Date;
}