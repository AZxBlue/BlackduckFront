export class MessengerUserInfo {
    fullName: string;
    profilePhotoUrl: string;
    profileBackgroundUrl: string;
    username: string;

    constructor(fullName: string, profilePhotoUrl: string, profileBackgroundUrl: string, username: string) {
        this.fullName = fullName;
        this.profilePhotoUrl = profilePhotoUrl;
        this.profileBackgroundUrl = profileBackgroundUrl;
        this.username = username;
    }
}

export class MessengerUserSidebarInfo {
    fullName: string;
    profilePhotoUrl: string;
    username: string;
    constructor(fullName: string, profilePhotoUrl: string, username: string) {
        this.fullName = fullName;
        this.profilePhotoUrl = profilePhotoUrl;
        this.username = username;
    }
}

export class Conversation {
    user1: MessengerUserSidebarInfo;
    user2: MessengerUserSidebarInfo;
    cid: string;
    constructor(user2: MessengerUserSidebarInfo) {
        this.user2 = user2;
    }
}