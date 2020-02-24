import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { loadCss, loadModules } from 'esri-loader';

const arcGISAPIForJSUrl = 'https://js.arcgis.com/4.14/';

@Injectable({
  providedIn: 'root'
})
export class EsriLoaderService {

  constructor(
    private alertController: AlertController,
  ) { }

  loadCss() {
    const urls = ['esri/css/main.css', 'dijit/themes/claro/claro.css'];
    urls.map(url => loadCss(`${arcGISAPIForJSUrl}${url}`));

    document.body.classList.add('claro');
  }

  loadModules(modules: string[]) {
    const options = {
      url: arcGISAPIForJSUrl,
      dojoConfig: {
        has: {
          'esri-native-promise': true
        }
      }
    };

    const modulesLoadedPromise = loadModules(modules, options);

    modulesLoadedPromise.catch(async () => {
      const alert = await this.alertController.create({
        header: 'Cannot Load Map',
        message: 'Unable to contact the Esri map service.',
        buttons: ['OK']
      });

      await alert.present();
    });

    return modulesLoadedPromise;
  }
}
