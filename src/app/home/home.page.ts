import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ModalMapComponent } from '../modal-map/modal-map.component';
import { RoutingService } from '../routing/routing.service';

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

  async routeToDetailScreen() {
    await this.routingService.navigate({ commands: ['/detail'] });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalMapComponent,
    });

    await modal.present();
  }
}
