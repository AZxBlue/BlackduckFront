export class EditPforileInfo {
    email: string;
    fullName: string;
    description: string;
    profilePicture: string;
    backgroundPicture: string;

    constructor(email: string, fullName: string, description: string, profilePicture: string, backgroundPicture: string) {
        this.email = email;
        this.fullName = fullName;
        this.description = description;
        this.profilePicture = profilePicture;
        this.backgroundPicture = backgroundPicture;
    }
}

export class EditProfileInfo2 {
    email: string;
    fullName: string;
    description: string;
    profilePhotoUrl: string;
    profileBackgroundUrl: string;

    constructor(email: string, fullName: string, description: string, profilePhotoUrl: string, profileBackgroundUrl: string) {
        this.email = email;
        this.fullName = fullName;
        this.description = description;
        this.profilePhotoUrl = profilePhotoUrl;
        this.profileBackgroundUrl = profileBackgroundUrl;
    }
}