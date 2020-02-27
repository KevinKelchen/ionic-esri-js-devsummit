import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';

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
    private platform: Platform,
  ) { }

  /**
   * Navigate back.
   */
  back() {
    // Provide the back animation.
    this.navController.setDirection('back', true, 'back');
    this.location.back();
  }

  /**
   * Configure what happens when pressing the hardware back button. Do this one time in the app.
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
    // Remove all existing Pages in the Ionic stack.
    // The Page being navigated to will become the only Page in the Ionic stack.
    // This does not affect browser history.
    // The 1st parameter with a value of "root" makes this happen.
    this.navController.setDirection('root', true, 'forward');
    return await this.router.navigate(params.commands, params.extras);
  }
}

export interface NavigateParams {
  commands: any[];
  extras?: NavigationExtras;
}
