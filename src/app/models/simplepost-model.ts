export class SimplePost {
    title: string;
    contentUrl: string;
    vidPhotoUrl: string;
    contentType: string;
    thumbnail: string;
    id: number;
    constructor(title: string, contentUrl: string,
        vidPhotoUrl: string, id: number, contentType: string, thumbnail: string) {
        this.title = title;
        this.contentUrl = contentUrl;
        this.vidPhotoUrl = vidPhotoUrl;
        this.id = id;
        this.contentType = contentType;
        this.thumbnail = thumbnail;
    }
}

export class Post {
    title: string;
    contentUrl: string;
    id: number;
    contentType: string;
    author: Author;
    comments: Comment[];
    creationDate: Date;
    description: string;
    rate: number;
}

export class Author {
    fullName: string;
    profilePhotoUrl: string;
    username: string;
}