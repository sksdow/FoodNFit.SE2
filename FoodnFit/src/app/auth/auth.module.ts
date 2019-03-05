import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './app-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
