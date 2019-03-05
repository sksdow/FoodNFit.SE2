import { Auth } from 'src/app/dtos/auth.dto';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/dtos/user.dto';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Recipe } from 'src/app/dtos/recipe.dto';


@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {

  constructor(
    private dataService: DataService
  ) {}

  insertRecipe() {
    const recipe = <Recipe>{
      description: "test",
      ingredients: [{ description: "test", amount: "0" }]
    };
    this.dataService.addRecipe(recipe);
  }

  getRecipes() {
    const subscription = this.dataService.getRecipes().subscribe(res => {
      console.log(res);
      subscription.unsubscribe();
    });
  }
}
