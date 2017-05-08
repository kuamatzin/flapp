import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Headers, Http } from '@angular/http';
import { JwtHelper } from "angular2-jwt";
import { NativeStorage } from '@ionic-native/native-storage';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class AuthenticationService {

  dev_url: string = "http://localhost:8100/";
  pro_url: string = "http://www.fielapp.inovuz.com/";
  current_url: string;
  error: string;
  contentHeader = new Headers({ "Content-Type": "application/json" });

  constructor(
    public http: Http,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private storage: NativeStorage
  ) {

    this.current_url = this.dev_url;

  }

  public facebookLogin() {
    this.fb.login(['public_profile', 'email',])
      .then((res: FacebookLoginResponse) => alert('Logged into Facebook!'))
      .catch(e => alert('Error logging into Facebook'));
  }

  public googlePlusLogin() {
    this.googlePlus.login({})
      .then(res => alert("Exito"))
      .catch(err => alert(err));
  }


  public login(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post(this.current_url + 'api/logins', JSON.stringify(credentials), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
      data => {
        if(data.status == 1) {
          this.authSuccess(data);
          resolve(data.status);
        }
        else {
          resolve(data.status);
        }
      },
      err => reject(err)
      );
    });
  }

  public getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  private authSuccess(data) {
    localStorage.setItem("user", JSON.stringify(data.user));
    this.storage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    this.storage.setItem('token', data.token);
  }

  public logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

}
