import { Injectable } from "@angular/core";

@Injectable()
export class ConstantService{
    public static baseUrl: string = 'http://192.168.43.75:8080';
    public static thisUrl: string = 'http://localhost:4200';
}