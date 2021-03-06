import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login-page/login-page';
import { SignupPage } from '../signup-page/signup-page';
import { AuthenticationService } from "../../providers/authentication-service";
import { ApiService } from "../../providers/api-service";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [AuthenticationService, ApiService]
})
export class AboutPage {
  arr = Array;
  user;
  cards;
  showLogin: boolean = true;
  fistTimeToLaunch: number = 0;
  loader;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private authentication: AuthenticationService,
    public loadingCtrl: LoadingController,
    private api: ApiService,
  ) {
  }

  ionViewWillEnter() {
    this.ifUserIsConnected();
  }

  ifUserIsConnected() {
    this.user = this.authentication.getUser();
    this.showLogin = this.user == null ? true : false;
    if (!this.showLogin && this.fistTimeToLaunch == 0) {
      this.presentLoading();
      this.api.getCardsByUser(this.user.id).then((results) => {
        this.cards = results;
        this.fistTimeToLaunch = this.fistTimeToLaunch + 1;
        this.loader.dismiss();
      }, (error) => {
        this.loader.dismiss();
        this.authentication.logout();
        this.showLogin = true;
      });
    }
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

  getMyCards(refresher) {
    this.presentLoading();
    this.api.getCardsByUser(this.user.id).then((results) => {
      this.cards = results;
      this.loader.dismiss();
      refresher.complete();
    }, (error) => {
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando Tarjetas"
    });
    this.loader.present();
  }


}
