import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ModalMapComponent } from '../modal-map/modal-map.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPage {

  constructor(
    private modalController: ModalController,
  ) { }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalMapComponent,
    });

    await modal.present();
  }
}
