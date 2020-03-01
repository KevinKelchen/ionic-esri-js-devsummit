import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

import { MapOptions } from '../esri-map/esri-map.service';
import { ModalMapComponent } from '../modal-map/modal-map.component';
import { RoutingService } from '../routing/routing.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  mapOptions: MapOptions = {
    basemap: 'topo',
    center: {
      x: -91.5,
      y: 42.5,
    },
    zoom: 9,
  };

  constructor(
    private routingService: RoutingService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
  ) { }

  async routeToDetailScreen() {
    await this.routingService.navigate({ commands: ['/detail'] });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalMapComponent,
      componentProps: {
        mapOptions: {
          basemap: 'hybrid',
          center: {
            x: -91.5,
            y: 42.5,
          },
          zoom: 9,
        }
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();
  }
}
