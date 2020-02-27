import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { BackButtonComponentModule } from '../back-button/back-button.component';
import { EsriMapComponentModule } from '../esri-map/esri-map.component';

import { DetailPageRoutingModule } from './detail-routing.module';
import { DetailPage } from './detail.page';

@NgModule({
  imports: [
    BackButtonComponentModule,
    DetailPageRoutingModule,
    EsriMapComponentModule,
    IonicModule,
  ],
  declarations: [DetailPage]
})
export class DetailPageModule {}
