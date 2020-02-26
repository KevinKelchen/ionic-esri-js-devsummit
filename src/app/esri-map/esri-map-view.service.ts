import { Injectable } from '@angular/core';

import { EsriLoaderService } from './esri-loader.service';

/**
 * This service is responsible for creating, storing, and re-using instances of Esri MapViews.
 * It exists because we learned from the ArcGIS JS API dev team that MapViews should not be destroyed
 * because there are unrecoverable WebGL contexts/resources that cannot be reclaimed by the browser and
 * can lead to app crashes.
 * This service will create and maintain a "pool" of MapViews; if a MapView is requested and none are in
 * the pool available for use, it will create a MapView. As MapViews are no longer needed they are released
 * and marked as being available for re-use at a subsequent time.
 */
@Injectable({
  providedIn: 'root'
})
export class EsriMapViewService {
  private esriLoaded: Promise<any>;
  private EsriMapView: typeof __esri.MapView;
  private EsriPoint: typeof __esri.Point;
  private EsriWatchUtils: typeof __esri.watchUtils;

  private mapViewDataList: {
    mapView: __esri.MapView;
    mapViewContainer: HTMLDivElement;
    available: boolean;
  }[] = [];

  constructor(
    private esriLoaderService: EsriLoaderService,
  ) { }

  private async loadEsri() {
    if (this.esriLoaded) {
      return this.esriLoaded;
    }

    const loadModulesPromise = this.esriLoaderService.loadModules<[
      typeof __esri.MapView,
      typeof __esri.Point,
      typeof __esri.watchUtils,
    ]>([
      'esri/views/MapView',
      'esri/geometry/Point',
      'esri/core/watchUtils',
    ]);

    [
      this.EsriMapView,
      this.EsriPoint,
      this.EsriWatchUtils,
    ] = await loadModulesPromise;

    this.esriLoaded = loadModulesPromise;
  }

  /**
   * Retrieves a MapView. If a MapView is not available, one will be created. If an existing MapView is available,
   * it will be retrieved and re-used.
   */
  async getMapView(parentElement: HTMLDivElement, mapViewProperties: MapViewProperties) {
    await this.loadEsri();

    // Find an available, existing MapView from the pool.
    let mapViewData = this.mapViewDataList.find(
      mapViewDataItem => mapViewDataItem.available
    );

    if (!mapViewData) {
      // Standard properties that never vary.
      const mapViewStandardProperties = {
        constraints: {
          minZoom: 4,
          maxZoom: 19,
          snapToZoom: false,
          rotationEnabled: false
        },
        ui: {
          components: ['attribution']
        }
      };

      const newMapViewContainer = document.createElement('div');
      newMapViewContainer.setAttribute('tappable', ''); // Avoid touch tap delay.
      parentElement.prepend(newMapViewContainer);

      mapViewData = {
        // The order of the Object Spread is deliberate; in reverse order the map does not properly load.
        // This would need to be adjusted if we wanted to implement default property values.
        mapView: new this.EsriMapView({
          container: newMapViewContainer,
          ...mapViewProperties,
          ...mapViewStandardProperties
        }),
        mapViewContainer: newMapViewContainer,
        available: false
      };

      // Store the MapView object instance and that the MapView is not available for use (it will be used immediately
      // by the client code that called this method to get a MapView).
      this.mapViewDataList.push(mapViewData);

      // TODO: Determine how to prevent/handle cases like rapid, successive navigations that could result in more MapViews than desired.
      // Less MapViews results in less resources being used.
      if (this.mapViewDataList.length > 2) {
        console.warn(`Number of MapViews is now at ${this.mapViewDataList.length} which has exceeded our max number of MapViews!`);
      }
    } else {
      // With an available MapView for re-use, mark that it will no longer be available because it's about to be used.
      mapViewData.available = false;

      parentElement.prepend(mapViewData.mapViewContainer);

      // Re-configure the MapView with new parameter values.
      mapViewData.mapView.container = mapViewData.mapViewContainer;

      await this.EsriWatchUtils.whenOnce(mapViewData.mapView, 'ready');

      mapViewData.mapView.center = new this.EsriPoint({
        x: mapViewProperties.center.x,
        y: mapViewProperties.center.y
      });

      mapViewData.mapView.zoom = mapViewProperties.zoom;
    }

    return mapViewData.mapView;
  }

  /**
   * When a MapView is no longer needed, make it available for later re-use.
   */
  async releaseMapView(mapView: __esri.MapView) {
    await this.loadEsri();

    const mapViewData = this.mapViewDataList.find(
      mapViewDataItem => mapViewDataItem.mapView === mapView
    );

    // Mark the MapView as being available for re-use.
    if (mapViewData) {
      mapViewData.available = true;
    }
  }
}

export interface MapViewProperties {
  center: {
    x: number;
    y: number;
  };
  zoom: number;
}
