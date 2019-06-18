import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  connecte = false;
  session;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public storage: Storage
  ) {
    this.initializeApp();
    this.session = this.storage.get('id_token_startdev');
    if (this.connecte === false && this.session == 'undefined') {
        this.router.navigate(['/connexion']);
    }
      /* this.authService.loggedIn().then((loggedIn) => {
        if(!loggedIn) {
          this.router.navigate(['/connexion']);
        }
      }) */
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
