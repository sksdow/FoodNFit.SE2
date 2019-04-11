import { Component, OnInit, DefaultIterableDiffer } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { User, Consumption } from "src/app/dtos/user.dto";
import { Calorie } from 'src/app/dtos/calorie.dto';


@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  userInfo: User = {
    email: "test",
    name: "test",
    height: 0.00,
    weight: 0.00,
    age: 0,
    gender: 'm',
    activitylevel: 0
  };
  
  display:Calorie = {
    BMR:0,
    BMI:0,
    TDEE:0,
    TotalCal:0
  };
  constructor(private dataService: DataService) {}

  ionViewWillEnter() {
    const subscription = this.dataService.getUserInfo().subscribe(info => {
      if (info) {
        this.userInfo = info;
        //call function
        //set ==
        console.log(this.userInfo.DietHistory);
         let totalCalorie = 0;
         this.userInfo.DietHistory.forEach(
           x => {
             if (x.date >= new Date().getDay) {
               x.recipe.nutrition.nutrients.forEach(
                 y => totalCalorie += y.amount
               )
             }
           }
         )
        this.mainCalculator();
        subscription.unsubscribe();
        this.display.TotalCal = totalCalorie;
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
  //make display method
  mainCalculator(){
  let height = this.userInfo.height;
  let weight = this.userInfo.weight;
  let age = this.userInfo.age;
  let activityLevel = this.userInfo.activitylevel;
  let gender = this.userInfo.gender;
  console.log(this.userInfo);
  //  let height = 70;
  //  let weight = 170;
  //  let age = 21;
  //  let activityLevel = 4;
  //  let gender = "m";

  weight = weight * .45359;
  height = height * 2.54;

  //get BMR
  if(gender == 'm')
		{
			this.display.BMR = (66+(13.75 * weight+(5 * height)-(6.8 * age)));
		}
		else
		{
			this.display.BMR = (655+(9.6 * weight) + (1.8 * height - (4.7 * age)));
    }
    this.display.BMR = Math.round(this.display.BMR*100);
    this.display.BMR = this.display.BMR/100;

    //getTDEE
    switch (activityLevel)
		{
		case "1":
    this.display.TDEE = this.display.BMR*1.2;
			break;
		case "2":
    this.display.TDEE = this.display.BMR *1.375;
			break;
		case "3":
    this.display.TDEE = this.display.BMR *1.55;
			break;
		case "4":
    this.display.TDEE = this.display.BMR *1.725;
			break;
		case "5":
    this.display.TDEE  = this.display.BMR * 1.9;
			break;
    }
    this.display.TDEE = Math.round(this.display.TDEE*100);
		this.display.TDEE = this.display.TDEE/100;

    this.display.BMI = (weight/(height*height))*703;
		this.display.BMI = Math.round(this.display.BMI*100);
		this.display.BMI = this.display.BMI/100;

    console.log(this.display.BMI, this.display.TDEE, this.display.BMR)
}
}
