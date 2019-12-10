import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInfo } from '../models/login-model';
import { JwtResponse } from '../models/jwt-model';
import { RegisterInfo } from '../models/register-model';
import { SimpleResponse } from '../models/simpleResponse-model';
import { ConstantService } from '../services/ConstantService';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = ConstantService.baseUrl + '/login';
  private signupUrl = ConstantService.baseUrl +'/signup';
 
  constructor(private http: HttpClient) {
  }
 
  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
 
  signUp(info: RegisterInfo): Observable<SimpleResponse> {
    return this.http.post<SimpleResponse>(this.signupUrl, info, httpOptions);
  }
}