import { Auth } from "src/app/dtos/auth.dto";
import { DataService } from "src/app/services/data.service";
import { User } from "src/app/dtos/user.dto";
import { AuthService } from "src/app/services/auth.service";
import { Component } from "@angular/core";
import { RecipeShort, RecipeDetailed } from "src/app/dtos/recipe.dto";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  currentIngredients: string[] = [];
  ingredientToAdd: string;
  searchResults: RecipeDetailed[];
  constructor(private dataService: DataService) {}

  searchRecipes() {
    const subscription = this.dataService
      .getRecipesByIngredients(this.currentIngredients, 10)
      .subscribe(x => {
        if (x !== null) {
          this.searchResults = x;
          console.log(x);
          subscription.unsubscribe();
        }
      });
  }

  addFoodToUser(recipe: RecipeDetailed) {
    this.dataService.addFoodToUser(recipe);
  }

}
