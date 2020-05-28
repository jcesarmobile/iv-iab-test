import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthMode } from '@ionic-enterprise/identity-vault';

import { AuthenticationService } from '../services/authentication';
import { IdentityService } from '../services/identity';
import { User } from '../models/user';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {
  user: User;
  authMode: string;
  bioType: string;

  constructor(
    private authentication: AuthenticationService,
    private identity: IdentityService,
    private navController: NavController,
    private browser: InAppBrowser
  ) { }

  async ionViewDidEnter() {
    this.identity.get().subscribe(u => (this.user = u));
    this.authMode = AuthMode[await this.identity.getAuthMode()];
    this.bioType = await this.identity.getBiometricType();
  }

  logout() {
    this.authentication
      .logout()
      .subscribe(() => this.navController.navigateRoot('/login'));
  }

  openIAB() {
    const browser = this.browser.create
    ('http://www.google.com', '_blank');
    browser.show();
  }

  openIAB2() {
    const browser = this.browser.create
    ('http://www.google.com', '_blank', 'presentationstyle=pagesheet');
    browser.show();
  }

  openIAB3() {
    const browser = this.browser.create
    ('http://www.google.com', '_blank', 'presentationstyle=formsheet');
    browser.show();
  }
}
