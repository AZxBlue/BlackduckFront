export class UploadPicInfo {
    title: String;
    file: String;
    vidPhoto: String;
    folderId: number;
    description: String;

    constructor(title: String, file: String, vidPhoto: String, folderId: number, description: String) {
        this.title = title;
        this.file = file;
        this.vidPhoto = vidPhoto;
        this.folderId = folderId;
        this.description = description;
        
    }

}

export class UploadedFileInfo {
    filename: string;
    constructor(filename: string) {
        this.filename = filename;
    }
}