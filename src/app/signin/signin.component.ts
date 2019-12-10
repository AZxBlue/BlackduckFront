import { Component, OnInit } from '@angular/core';
import { RegisterInfo } from '../models/register-model';
import { LoginInfo } from '../models/login-model';
import { AuthService } from '../services/AuthService';
import { TokenStorageService } from '../services/tokenStorageService';
import { AppComponent } from '../app.component';
import { ConstantService } from '../services/ConstantService';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService,private tokenStorage: TokenStorageService) { }
  message: String;
  register: boolean = false;
  checkPassword: string = '';
  info: RegisterInfo = {
    email: "",
    password: "",
    username: "",
    fullName: "",
    description: ""
  }

  linfo: LoginInfo = {
    username: "",
    password: ""
  }

  swap(): void {
    this.register = !this.register;
    this.message ="";
  }

  Register(): void {
    if (this.info.password != this.checkPassword) {
      alert("Both passwords should be the same!")
      return;
    }
      this.authService.signUp(this.info).subscribe(
        data => {
          console.log(data);
          if(!data.success){
            this.message = data.message;
          }else{
            this.register=false;
            this.message="You registered succesfully!"
          }
        },
        error => {
          this.message = error.message;
        }
      );
  }

  SignIn(): void {
    this.authService.attemptAuth(this.linfo).subscribe(
      data => {
        console.log(data);
          this.register=false;
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUsername(data.user.displayName);
          this.tokenStorage.saveUUID(data.user.uuid);
          this.message=data.user.displayName;
          window.location.href = ConstantService.thisUrl;
      },
      error => {
        this.message = "E-mail or password is incorrect!"
      }
    );
  }

  ngOnInit() {
  }




}
