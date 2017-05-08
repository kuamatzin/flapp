import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login-page/login-page';
import { SignupPage } from '../signup-page/signup-page';
import { AuthenticationService } from "../../providers/authentication-service";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [AuthenticationService]
})
export class ContactPage {
  user;
  showLogin: boolean = true;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private authentication: AuthenticationService
  ) {
    this.ifUserIsConnected();
  }

  ionViewWillEnter() {
    this.ifUserIsConnected();
  }

  ifUserIsConnected() {
    this.user = this.authentication.getUser();
    this.showLogin = this.user == null ? true : false;
  }

  display(page) {
    let displayPage = page == 'login' ? LoginPage : SignupPage;
    let modal = this.modalCtrl.create(displayPage);
    modal.present();

    modal.onDidDismiss(data => {
      if (data.loginSuccess) {
        this.showLogin = false;
      }
    });
  }

  logout() {
    this.authentication.logout();
    this.showLogin = true;
  }

}
