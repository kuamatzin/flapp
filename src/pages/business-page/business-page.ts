import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ApiService } from "../../providers/api-service";
import { AuthenticationService } from "../../providers/authentication-service";

@IonicPage()
@Component({
  selector: 'page-business-page',
  templateUrl: 'business-page.html',
  providers: [ApiService, AuthenticationService]
})
export class BusinessPage {

  business;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public api: ApiService,
    private authentication: AuthenticationService,
    public params: NavParams
  ) {
    this.business = params.get('business');
  }

  dismiss(loginSuccess) {
    this.viewCtrl.dismiss();
  }
      
  
}
