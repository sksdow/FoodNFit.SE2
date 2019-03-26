import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { User, Consumption } from "src/app/dtos/user.dto";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  userInfo: User;
  constructor(private dataService: DataService) {}

  ionViewWillEnter() {
    const subscription = this.dataService.getUserInfo().subscribe(info => {
      if (info) {
        this.userInfo = info;
        subscription.unsubscribe();
      }
    });
  }

  deleteFood(food: Consumption) {
    const subscription = this.dataService.deleteFoodFromUser(food).subscribe(x => {
      if (x) {
        this.dataService.getUserInfo().subscribe(info => {
          if (info) {
            this.userInfo = info;
            subscription.unsubscribe();
          }
        });
      }
    });
  }
}
