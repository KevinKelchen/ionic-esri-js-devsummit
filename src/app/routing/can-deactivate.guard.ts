import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { RoutingService } from './routing.service';

/**
 * An Angular CanDeactivate route guard that intervenes in a routing navigation attempt
 * in order to do things like check and prompt for unsaved changes.
 * It will also attempt close an open modal and prevent the navigation from proceeding.
 * This prevents navigation in the background while a modal remains open; it makes
 * back navigation address any open modals before trying to navigate.
 */
@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor(
    private routingService: RoutingService,
    private modalController: ModalController,
  ) { }

  async canDeactivate(
    routedComponent: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ) {
    const modal = await this.modalController.getTop();

    if (modal) {
      // If a modal was open, close the modal and do not proceed with the navigation.
      await modal.dismiss();
      this.routingService.fixNavHistoryIfNavigatingWithBrowserButton(currentState.url);
      return false;
    }

    return true;
  }
}

export interface CanComponentDeactivate {
  canDeactivate: () => Promise<boolean>;
}
