import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';

import { RoutingService } from './routing/routing.service';

const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private routingService: RoutingService,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    // Capacitor plugins do not require waiting for the device ready event.
    // Use of Cordova plugins may require waiting for platform ready even
    // when using Cordova plugins within Capacitor.
    // await this.platform.ready();

    await SplashScreen.hide();

    this.routingService.configureHardwareBackButton();
  }
}
