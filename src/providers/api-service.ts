import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { JwtHelper } from "angular2-jwt";
import { NativeStorage } from '@ionic-native/native-storage';
import { AuthenticationService } from "./authentication-service";

import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  dev_url: string = "http://localhost:8100/";
  pro_url: string = "http://www.fielapp.inovuz.com/";
  current_url: string;
  error: string;
  contentHeader = new Headers({ "Content-Type": "application/json" });

  constructor(
    public http: Http,
    public storage: NativeStorage,
    private authentication: AuthenticationService
  ) {
    this.current_url = this.dev_url;
  }

  public getCards() {
    return new Promise((resolve, reject) => {
      this.http.get(this.current_url + 'cards').subscribe(data => resolve(data.json()), error => reject(error));
    });
  }

  public getCardsByBusinessType(businessType) {
    return new Promise((resolve, reject) => {
      this.http.get(this.current_url + 'cards/' + businessType).subscribe(data => resolve(data.json()), error => reject(error));
    });
  }

  public getCardsByUser(user_id) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);

      this.http.get(this.current_url + 'api/cards/' + user_id, {
        headers: headers
      }).map(res => res.json())
        .subscribe(
        data => resolve(data.cards),
        err => reject(err)
        );
    });
  }

}
