import { Component, OnInit } from '@angular/core';
//import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Auth } from '../dtos/auth.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  userToRegister: Auth = { email: "", password: "" };
  userToLogin: Auth = { email: "", password: "" };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  tryRegister() {
    
    this.authService.emailSignUp(this.userToRegister).then(
      res => {
        console.log("Success" , res);
      },
      err => {
        console.log("In page:" , err);
      }
    );
  }

  tryLogin() {
    this.authService.emailLogin(this.userToLogin).then(
      res => {
        console.log(this.authService.Email);
        this.router.navigateByUrl('/content/tabs/tab1')
      },
      err => {
        console.log(err);
      }
    );
  }

  goToSignup(){
    
    this.router.navigateByUrl('/signup')
    //this.navCtrl.goForward();
  }

}
