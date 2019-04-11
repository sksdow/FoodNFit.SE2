import { Component, OnInit } from '@angular/core';
import { Auth } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html'
})
export class SignupPage implements OnInit {
  userToRegister: Auth = { email: "", password: "" };


  constructor(
    private authService: AuthService,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  tryRegister() {
    
    this.authService.emailSignUp(this.userToRegister).then(
      res => {
        alert("Account successfully registered");
        console.log("Success" , res);
       // this.router.navigateByUrl('/auth')
       // this.navCtrl.navigateBack(']/auth');
      },
      err => {
        alert("Account registration unsuccessful");
        console.log("In page:" , err);
      }
    );
  }

  

}
