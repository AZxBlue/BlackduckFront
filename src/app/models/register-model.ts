export class RegisterInfo {
    password: string;
    username: string;
    fullName: string;
    email: string;
    description: string;

    constructor(email: string, password: string, username: string, fullName: string, description: string) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.fullName = fullName;
        this.description = description
    }
}