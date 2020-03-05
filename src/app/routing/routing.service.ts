import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';

/**
 * This service is used for application routing. It pulls routing collaborators into one location to simplify,
 * and provide greater centralization of, the routing API. It also creates useful encapsulation for methods
 * whose implementations may change.
 */
@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private router: Router,
    private location: Location,
    private navController: NavController,
    private modalController: ModalController,
    private platform: Platform,
  ) { }

  /**
   * Navigate back.
   */
  async back() {
    const modal = await this.modalController.getTop();

    if (modal) {
      // If a modal was open, close the modal and do not proceed with the navigation.
      await modal.dismiss();
      return;
    }

    // Provide the back animation.
    this.navController.setDirection('back', true, 'back');

    this.location.back();
  }

  /**
   * Configure what happens when pressing the hardware back button.
   * Do this one time in the app.
   */
  configureHardwareBackButton() {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      this.back();
    });
  }

  /**
   * Navigate forward.
   */
  async navigate(params: NavigateParams): Promise<boolean> {
    // By navigating in the "root" direction the Page being
    // navigated to will become the only Page in the Ionic stack.
    this.navController.setDirection('root', true, 'forward');

    return await this.router.navigate(params.commands, params.extras);
  }

  /**
   * Detect if we are currently navigating with a browser/hardware navigation button.
   *
   * NOTE: The implementation would also consider some uses of the History API as a
   * browser button navigation because it determines this based on whether the navigation
   * is from a popstate event.
   */
  isNavigatingWithBrowserButton() {
    return this.router.getCurrentNavigation().trigger === 'popstate';
  }

  /**
   * This logic is for a workaround to an Angular issue.
   * https://github.com/angular/angular/issues/13586#issuecomment-458241789
   *
   * If we are not navigating due to a route guard returning false, and we were attempting
   * to navigate with a browser/hardware navigation button, correct the current position
   * in the browser navigation history since the navigation will be canceled and Angular
   * won't correct the history for us automatically.
   *
   * Without performing this correction for the denied navigation attempt, the current
   * browser navigation history POSITION will be for the history entry we were trying to
   * navigate TO. This leaves you at the wrong position in the navigation history stack and
   * therefore subsequent back/forward movement through the navigation history will be incorrect.
   * While Angular does revert the URL to be for the URL we were on before the attempted
   * navigation, it modifies the history entry we were trying to navigate TO (again, where
   * Angular incorrectly left us) which effectively removes the URL we were trying to navigate to
   * from navigation history.
   *
   * A side effect of the implementation is that forward navigation history is lost.
   */
  fixNavHistoryIfNavigatingWithBrowserButton(url: string) {
    if (this.isNavigatingWithBrowserButton()) {
      this.location.go(url);
    }
  }
}

export interface NavigateParams {
  commands: any[];
  extras?: NavigationExtras;
}
