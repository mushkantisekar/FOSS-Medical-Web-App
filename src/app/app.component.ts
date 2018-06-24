import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
// import { config } from './dbdetails';
import { Clinical } from '../pages/clinical/clinical';
import { Department } from '../pages/department/department';
import { LoginPage } from '../pages/login/login';
import { AccountPage } from '../pages/account/account';

import firebase from 'firebase';

const  config = {
  apiKey: "AIzaSyCxNFJseM6G-cjjKgz_29J6pi4FLi-irTw",
  authDomain: "universal-medical-webapp.firebaseapp.com",
  databaseURL: "https://universal-medical-webapp.firebaseio.com",
  projectId: "universal-medical-webapp",
  storageBucket: "universal-medical-webapp.appspot.com",
  messagingSenderId: "117870049439"
};


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor( platform: Platform) {
    firebase.initializeApp(config);

    platform.ready().then(() => {
  
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Clinical', component: Clinical },
      { title: 'Department', component: Department},
      { title: 'Login', component: LoginPage },
      { title : 'Accounts', component: AccountPage }
    ];

  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
