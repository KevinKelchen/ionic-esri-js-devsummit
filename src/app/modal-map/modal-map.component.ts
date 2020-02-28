import { Component, NgModule } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

import { EsriMapComponentModule } from '../esri-map/esri-map.component';

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss'],
})
export class ModalMapComponent {

  constructor(
    private modalController: ModalController
  ) { }

  async closeModal() {
    await this.modalController.dismiss();
  }
}

@NgModule({
  imports: [
    EsriMapComponentModule,
    IonicModule,
  ],
  declarations: [ModalMapComponent],
  exports: [ModalMapComponent]
})
export class ModalMapComponentModule { }
