import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/dtos/user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userToUpdate: User = { email: "", name: "test" };
  updatedUser: User = {email: "", name: ""};
  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {
    this.getUserInfo()
  }

  updateUserInfo() {
    this.dataService.updateUserInfo(this.userToUpdate).then(
      res => {
        this.getUserInfo()
      }
    ).catch(e => console.log(e));

  }

  private getUserInfo() {
    const subscription = this.dataService.getUserInfo().subscribe(user => {
      if (user) {
        this.updatedUser = user;
        subscription.unsubscribe();
      }
    });
  }

  logOut() {
    this.authService.signOut();
  }
}
