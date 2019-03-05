import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { first } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Recipe } from "../dtos/recipe.dto";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../dtos/user.dto";
import { AuthService } from "./auth.service";
import { promise } from 'protractor';

@Injectable({
  providedIn: "root"
})
export class DataService {
  private recipeCollection: AngularFirestoreCollection<Recipe>;
  private recipes: Observable<Recipe[]>;
  private userCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.recipeCollection = afs.collection<Recipe>("recipes");
    this.recipes = this.recipeCollection.valueChanges();

    this.userCollection = afs.collection<User>("users");
    this.users = this.userCollection.valueChanges();
  }

  addRecipe(recipe: Recipe) {
    recipe.id = this.afs.createId();
    this.recipeCollection.add(recipe);
  }

  getRecipes(): Observable<Recipe[]> {
    return this.recipes;
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
      .valueChanges().subscribe(
        users => {
          result.next(users[0])
          subscription.unsubscribe();
        }
      );
    return result;
  }
}
