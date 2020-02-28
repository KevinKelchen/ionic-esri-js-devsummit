import { ChangeDetectionStrategy, Component, ElementRef, NgModule, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { EsriMapService } from './esri-map.service';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ViewEncapsulation is disabled because using the default, Emulated ViewEncapsulation adds CSS selector
  // attributes to elements in the template, and this doesn't happen for esri's dynamically created elements.
  // This means that CSS rules that target esri content would not be applied.
  encapsulation: ViewEncapsulation.None,
})
export class EsriMapComponent implements OnDestroy, OnInit {

  private mapEventHandles: IHandle[] = [];
  private mapView: __esri.MapView;

  constructor(
    private elementRef: ElementRef,
    private esriMapService: EsriMapService,
  ) { }

  async ngOnInit() {
    this.mapView = await this.esriMapService.loadMap(this.elementRef.nativeElement);
  }

  async ngOnDestroy() {
    for (const mapEventHandle of this.mapEventHandles) {
      mapEventHandle.remove();
    }

    await this.esriMapService.teardown(this.mapView);
  }
}

@NgModule({
  declarations: [EsriMapComponent],
  exports: [EsriMapComponent]
})
export class EsriMapComponentModule { }
