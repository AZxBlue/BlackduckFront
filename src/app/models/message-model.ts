export class MessageModel{
    message:string;
    toUser: string;
    constructor(message: string, toUser: string){
        this.message=message;
        this.toUser = toUser;
    }
}