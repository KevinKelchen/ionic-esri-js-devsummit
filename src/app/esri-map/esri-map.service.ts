import { Injectable } from '@angular/core';

import { EsriLoaderService } from './esri-loader.service';
import { EsriMapViewService } from './esri-map-view.service';

/**
 * This service is a singleton responsible for the heavy lifting of working with
 * the ArcGIS API for JavaScript.
 * This design can be adjusted to be a service instance per EsriMapComponent instance
 * if desired (moving map instance state or event bindings into this service, etc.).
 */
@Injectable({
  providedIn: 'root'
})
export class EsriMapService {
  private esriLoaded: Promise<any>;
  private EsriMap: typeof __esri.Map;
  private EsriBasemap: typeof __esri.Basemap;
  private EsriWatchUtils: typeof __esri.watchUtils;

  constructor(
    private esriLoaderService: EsriLoaderService,
    private esriMapViewService: EsriMapViewService,
  ) { }

  /**
   * Call and await this method at the start of every public method to ensure that esri dependencies have been
   * loaded before trying to use them.
   * This pattern allows for lazy-loading the JS API without having a dedicated "init" method whose invocation
   * needs to be managed in client code to ensure that it is called at the right time and called only once.
   */
  private async loadEsri() {
    if (this.esriLoaded) {
      return this.esriLoaded;
    }

    const loadModulesPromise = this.esriLoaderService.loadModules<[
      typeof __esri.Map,
      typeof __esri.Basemap,
      typeof __esri.watchUtils,
    ]>([
      'esri/Map',
      'esri/Basemap',
      'esri/core/watchUtils',
    ]);

    [
      this.EsriMap,
      this.EsriBasemap,
      this.EsriWatchUtils,
    ] = await loadModulesPromise;

    this.esriLoaded = loadModulesPromise;
  }

  /**
   * Create a map. This may create or re-use a MapView and its associated Map.
   */
  async createMap(createMapOptions: CreateMapOptions) {
    await this.loadEsri();

    const mapView = await this.esriMapViewService.getMapView(createMapOptions.mapViewEl, {
      center: createMapOptions.mapOptions.center,
      zoom: createMapOptions.mapOptions.zoom,
    });

    if (!mapView.map) {
      mapView.map = new this.EsriMap({
        basemap: createMapOptions.mapOptions.basemap,
      });
    } else {
      mapView.map.basemap = this.EsriBasemap.fromId(createMapOptions.mapOptions.basemap);
    }

    await this.EsriWatchUtils.whenOnce(mapView, 'ready');

    return mapView;
  }

  /**
   * Clean up map-related resources and release the MapView for future re-use.
   */
  async teardown(mapView: __esri.MapView) {
    await this.loadEsri();

    await this.esriMapViewService.releaseMapView(mapView);
  }
}

export interface MapOptions {
  basemap: string;
  center: {
    x: number;
    y: number;
  };
  zoom: number;
}

export interface CreateMapOptions {
  mapViewEl: HTMLDivElement;
  mapOptions: MapOptions;
}
