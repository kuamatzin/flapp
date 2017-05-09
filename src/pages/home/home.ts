import { Component } from '@angular/core';
import { NavController, LoadingController,ModalController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { ApiService } from "../../providers/api-service";
import { AuthenticationService } from "../../providers/authentication-service";
import { BusinessPage } from '../business-page/business-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiService, AuthenticationService]
})


export class HomePage {

  cards: any;
  businessType: string = '';
  loader;
  user: string;

  constructor(
    public navCtrl: NavController,
    public http: Http,
    private storage: NativeStorage,
    public loadingCtrl: LoadingController,
    public api: ApiService,
    private authentication: AuthenticationService,
    public modalCtrl: ModalController
    
  ) {

    storage.getItem('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(console.log);

    this.presentLoading();


    this.api.getCards().then(results => {
      this.cards = results;
      this.loader.dismiss();
    }, error => console.log(error));

  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando Tarjetas"
    });
    this.loader.present();
  }


  getCardsByBusinessType() {
    this.presentLoading();

    this.api.getCardsByBusinessType(this.businessType).then(results => {
      this.cards = results
      this.loader.dismiss();
    }, error => console.log(error));
  }

  getBusinessDetails(business) {
    let modal = this.modalCtrl.create(BusinessPage, { business: business});
    modal.present();

    modal.onDidDismiss(data => {

    });
  }

}
