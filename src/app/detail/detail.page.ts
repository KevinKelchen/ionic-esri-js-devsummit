import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

import { MapOptions } from '../esri-map/esri-map.service';
import { ModalMapComponent } from '../modal-map/modal-map.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPage {

  mapOptions: MapOptions = {
    basemap: 'streets',
    center: {
      x: -91.5,
      y: 42.5,
    },
    zoom: 9,
  };

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
  ) { }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalMapComponent,
      componentProps: {
        mapOptions: {
          basemap: 'dark-gray',
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
