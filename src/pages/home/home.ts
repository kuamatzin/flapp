import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  cards: any;
  businessType: string = '';
  loader;
  dev_url: string = "http://localhost:8100/";
  pro_url: string = "http://www.fielapp.inovuz.com/";
  current_url: string;
  user: string;

  constructor(
    public navCtrl: NavController,
    public http: Http,
    private storage: NativeStorage,
    public loadingCtrl: LoadingController,
  ) {

    this.current_url = this.dev_url;


    storage.getItem('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(console.log);

    this.presentLoading();

    this.http.get(this.current_url + 'cards').subscribe(data => {
      this.cards = data.json();
      this.loader.dismiss();
    });

  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando Tarjetas"
    });
    this.loader.present();
  }

  getCardsByBusinessType() {
    this.presentLoading();
    this.http.get(this.current_url + 'cards/' + this.businessType).subscribe(data => {
      this.cards = data.json();
      this.loader.dismiss();
    });
  }

}
