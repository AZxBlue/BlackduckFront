export class SimpleFolder {
    folderName: String;
    description: String;
    folderPrivate: boolean;

    constructor(folderName: string, description: string, folderPrivate: boolean) {
        this.folderName = folderName;
        this.description = description;
        this.folderPrivate = folderPrivate;
    }
}

export class SimpleFolder2 {
    title: String;
    description: String;
    id: number;
    folderPrivate: boolean;
    constructor(title: string, description: string, id: number,folderPrivate: boolean) {
        this.title = title;
        this.description = description;
        this.id = id
        this.folderPrivate = folderPrivate;
    }
}