import { Author } from './simplepost-model';

export class commentInfo{
    postId: number;
    content: String;
    videoTime: number;
     constructor(postId: number, content: string, videoTime: number){
        this.postId = postId;
        this.content = content;
        this.videoTime = videoTime;
     }
}

export class Comment{
    author: Author;
    content: string;
    creationDate: Date;
    videoTime: number;
}