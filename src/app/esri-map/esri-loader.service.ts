import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { loadModules } from 'esri-loader';

// Single place in the app where we specify the JS API version.
const arcGISAPIForJSUrl = 'https://js.arcgis.com/4.14/';

/**
 * This service is responsible for lazy-loading esri dependencies.
 * As a wrapper for `esri-loader` it ensures consistency of configuration
 * and error handling.
 */
@Injectable({
  providedIn: 'root'
})
export class EsriLoaderService {

  constructor(
    private alertController: AlertController,
  ) { }

  loadModules<ModuleTypes extends any[]>(modules: string[]) {
    const options = {
      url: arcGISAPIForJSUrl,
      css: `${arcGISAPIForJSUrl}${'esri/css/main.css'}`,
      dojoConfig: {
        has: {
          'esri-native-promise': true // Use native Promises.
        }
      },
    };

    const modulesLoadedPromise = loadModules<ModuleTypes>(modules, options);

    modulesLoadedPromise.catch(async () => {
      const alert = await this.alertController.create({
        header: 'Cannot Load Map',
        message: 'Unable to contact the Esri map service.',
        buttons: ['OK'],
      });

      await alert.present();
    });

    return modulesLoadedPromise;
  }
}
