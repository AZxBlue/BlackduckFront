export class userProfileResponse {
    username: string;
    fullName: string;
    description: string;
    profileBackgroundUrl: string;
    profilePhotoUrl: string;
    profileThumbnail: string;

    constructor(username: string, fullName: string, description: string, profileBackgroundUrl: string,
        profilePhotoUrl: string, profileThumbnail: string) {
        this.username = username;
        this.fullName = fullName;
        this.description = description;
        this.profileBackgroundUrl = profileBackgroundUrl;
        this.profilePhotoUrl = profilePhotoUrl;
        this.profileThumbnail = profileThumbnail;
    }
}