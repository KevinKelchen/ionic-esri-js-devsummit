import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { RoutingService } from '../routing/routing.service';

type BackCloseButtonMode = 'md' | 'ios';

/**
 * Custom back button that uses browser-style navigation history.
 * The "back" type style mimics the ion-back-button appearance and honors the platform style mode.
 */
@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent implements OnInit {
  private mode = new BehaviorSubject<BackCloseButtonMode>('md');
  mode$ = this.mode.asObservable();

  constructor(
    private routingService: RoutingService,
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.mode.next(this.platform.is('ios') ? 'ios' : 'md');
  }

  onClick() {
    this.routingService.back();
  }
}

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [BackButtonComponent],
  exports: [BackButtonComponent]
})
export class BackButtonComponentModule { }
