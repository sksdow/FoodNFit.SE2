import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { first, map } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { RecipeDetailed, RecipeShort } from "../dtos/recipe.dto";
import { Observable, BehaviorSubject } from "rxjs";
import { User, Consumption } from "../dtos/user.dto";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IonDatetime } from "@ionic/angular";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private userCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;
  private rapidApiKey = "4a110e9594msh1836b5f9c39ff6dp15bc27jsn97736ccede4e";
  private getRecipesByIngredientsURI =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients={ingredients}";
  private getRecipesInfoURI =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?includeNutrition=true&ids={ids}";

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.userCollection = afs.collection<User>("users");
    this.users = this.userCollection.valueChanges();
  }

  getRecipesByIngredients(ingredients: string[], resultCount?: number): Observable<RecipeDetailed[]> {
    let requestURI = this.getRecipesByIngredientsURI.replace(
      "{ingredients}",
      ""
    );
    requestURI = resultCount ? requestURI.replace("number=5", "number="+resultCount) : requestURI;
    ingredients.forEach(x => {
      requestURI = requestURI + x + "%2C";
    });
    requestURI = requestURI.slice(0, requestURI.lastIndexOf("%2C"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "X-RapidAPI-Key": this.rapidApiKey
      })
    };
    let result = new BehaviorSubject<RecipeDetailed[]>(null);
    const subscription = this.http.get(requestURI, httpOptions).pipe(
      map((value: Object[], index: number) => {
        let recipes: RecipeShort[] = [];
        value.forEach(x => {
          recipes.push(x as RecipeShort);
        });
        return recipes;
      })
    ).subscribe(recipes => {
      this.getRecipesDetails(recipes).subscribe(
        recipesDetails => {
          result.next(recipesDetails);
          subscription.unsubscribe();
        }
      )
    });
    return result;
  }

  private getRecipesDetails(recipes: RecipeShort[]): Observable<RecipeDetailed[]> {
    let requestURI = this.getRecipesInfoURI.replace("{ids}", "");
    recipes.forEach(x => {
      requestURI = requestURI + x.id + "%2C";
    });
    requestURI = requestURI.slice(0, requestURI.lastIndexOf("%2C"));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "X-RapidAPI-Key": this.rapidApiKey
      })
    };
    return this.http.get(requestURI, httpOptions).pipe(
      map((value: Object[], index: number) => {
        console.log(value);
        let recipes: RecipeDetailed[] = [];
        value.forEach(x => {
          recipes.push(x as RecipeDetailed);
        });
        return recipes;
      })
    );
  }

  addFoodToUser(recipe: RecipeDetailed): Observable<boolean> {
    let result = new BehaviorSubject<boolean>(false);
    const subscription = this.getUserInfo().subscribe(user => {
      if (user) {
        if (user.DietHistory === undefined) {
          user.DietHistory = [];
        }
        const food: Consumption = {
          date: this.datePipe.transform(new Date(), "MM-dd-yyyy"),
          recipe: recipe
        };
        user.DietHistory.push(food);
        this.updateUserInfo(user).finally(() => {
          result.next(true);
        });
        subscription.unsubscribe();
      }
    });
    return result;
  }

  deleteFoodFromUser(foodToDelete: Consumption): Observable<boolean> {
    let result = new BehaviorSubject<boolean>(false);
    const subscription = this.getUserInfo().subscribe(user => {
      if (user) {
        user.DietHistory.splice(user.DietHistory.indexOf(foodToDelete), 1);
        this.updateUserInfo(user).finally(() => {
          result.next(true);
        });;
        subscription.unsubscribe();
      }
    });
    return result;
  }

  updateUserInfo(user: User): Promise<any> {
    user.email = this.auth.Email;
    const currentUser = this.userCollection.doc(this.auth.Uid);
    // console.log(user, 'hi');
    return currentUser.update(user);
  }

  getUserInfo(): Observable<User> {
    let result = new BehaviorSubject<User>(null);
    const subscription = this.afs
      .collection<User>("users", ref =>
        ref.where("email", "==", this.auth.Email)
      )
      .valueChanges()
      .subscribe(users => {
        result.next(users[0]);
        subscription.unsubscribe();
      });
    return result;
  }
}
