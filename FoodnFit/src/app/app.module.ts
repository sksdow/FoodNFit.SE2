import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AngularFireModule } from "@angular/fire";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { DataService } from "./services/data.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./services/auth.service";
import { FormsModule } from '@angular/forms';

export const firebaseConfig = {
  apiKey: "AIzaSyC8I2WIty6Nyij80F43FpDzs_zw-xzb1Ds",
  authDomain: "foodnfit-4a038.firebaseapp.com",
  databaseURL: "https://foodnfit-4a038.firebaseio.com",
  projectId: "foodnfit-4a038",
  storageBucket: "foodnfit-4a038.appspot.com",
  messagingSenderId: "601700821886"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DataService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
