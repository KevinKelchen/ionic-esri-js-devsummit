import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { RoutingService } from './routing/routing.service';

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
    await this.platform.ready();

    this.routingService.configureHardwareBackButton();
  }
}
