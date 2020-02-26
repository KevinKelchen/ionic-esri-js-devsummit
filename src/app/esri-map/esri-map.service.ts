import { Injectable } from '@angular/core';
import { EsriLoaderService } from './esri-loader.service';
import { EsriMapViewService } from './esri-map-view.service';

@Injectable({
  providedIn: 'root'
})
export class EsriMapService {
  private esriLoaded: Promise<any>;
  private EsriWebMap: typeof __esri.WebMap;
  private EsriGraphicsLayer: typeof __esri.GraphicsLayer;
  private EsriGraphic: typeof __esri.Graphic;
  private EsriWatchUtils: typeof __esri.watchUtils;

  constructor(
    private esriLoaderService: EsriLoaderService,
    private esriMapViewService: EsriMapViewService,
  ) { }

  /**
   * Call and await this method at the start of every public method to ensure that esri dependencies have been
   * loaded before trying to use them.
   * This pattern allows for lazy-loading the JS API without having a dedicated "init" method that needs to be
   * managed in client code to ensure that it is called and called only once.
   */
  private async loadEsri() {
    if (this.esriLoaded) {
      return this.esriLoaded;
    }

    const loadModulesPromise = this.esriLoaderService.loadModules<[
      typeof __esri.WebMap,
      typeof __esri.GraphicsLayer,
      typeof __esri.Graphic,
      typeof __esri.watchUtils,
    ]>([
      'esri/WebMap',
      'esri/layers/GraphicsLayer',
      'esri/Graphic',
      'esri/core/watchUtils',
    ]);

    [
      this.EsriWebMap,
      this.EsriGraphicsLayer,
      this.EsriGraphic,
      this.EsriWatchUtils,
    ] = await loadModulesPromise;

    this.esriLoaded = loadModulesPromise;
  }

  async loadMap(mapViewEl: HTMLDivElement) {
    await this.loadEsri();

    const mapView = await this.esriMapViewService.getMapView(mapViewEl, {
      center: {
        x: -91.5,
        y: 42.5
      },
      zoom: 9
    });

    if (!mapView.map) {
      mapView.map = new this.EsriWebMap({
        portalItem: {
          // id: '55ebf90799fa4a3fa57562700a68c405' // Vector Streets.
          id: 'd8855ee4d3d74413babfb0f41203b168' // Raster Streets.
        },
        layers: [
          new this.EsriGraphicsLayer({ id: 'myLocation' }),
        ]
      });
    }

    await this.EsriWatchUtils.whenOnce(mapView, 'ready');

    return mapView;
  }

  // Clean up map-related resources and release the MapView for future re-use.
  async teardown(mapView: __esri.MapView) {
    await this.esriMapViewService.releaseMapView(mapView);
  }
}
