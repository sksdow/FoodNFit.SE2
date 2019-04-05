import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from "@angular/router";
import { User } from "../dtos/user.dto";
import { Auth } from "../dtos/auth.dto";
import { DataService } from "./data.service";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentAuth: any = null;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.userCollection = afs.collection<User>("users");
  }

  get Uid() {
    return this.currentAuth.user.uid;
  }
  get Email() {
    return this.currentAuth.user.email;
  }

  //// Email/Password Auth ////

  emailSignUp(userToReg: Auth) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(userToReg.email, userToReg.password)
      .then(user => {
        const userInfo: User = {
          email: userToReg.email,
          name: "",
          weight: 0
        };
        this.userCollection.doc(user.user.uid).set(userInfo);
      })
      .catch(error => console.log(error));
  }

  emailLogin(user: Auth) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(user => {
        this.currentAuth = user;
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth
      .sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch(error => console.log(error));
  }

  //// Sign Out ////

  signOut(): void {
    this.currentAuth = null;
    this.afAuth.auth.signOut();
    this.router.navigate(["/"]);
  }
}
