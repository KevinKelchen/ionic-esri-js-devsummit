import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  constructor(
    private routingService: RoutingService,
    private modalController: ModalController,
  ) { }

  routeToDetailScreen() {
    this.routingService.navigate({ commands: ['/detail'] });
  }

  openModal() {

  }
}
