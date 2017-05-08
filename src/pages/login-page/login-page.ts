import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { AuthenticationService } from "../../providers/authentication-service";




@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
  providers: [AuthenticationService]
})
export class LoginPage {

  user;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private authentication: AuthenticationService,
    public toastCtrl: ToastController
  ) {

  }

  dismiss(loginSuccess) {
    let data = { loginSuccess: loginSuccess };
    this.viewCtrl.dismiss(data);
  }

  login(credentials) {
    this.authentication.login(credentials).then((result) => {
      if(result == 1) {
        this.dismiss(true);
      }
      else {
        this.presentToast();
      }
    }), (error) => console.log(error);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Credenciales inválidas',
      position: 'top',
      duration: 4000
    });
    toast.present();
  }



}
