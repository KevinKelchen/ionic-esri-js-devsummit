import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { EsriMapComponentModule } from '../esri-map/esri-map.component';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    EsriMapComponentModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
