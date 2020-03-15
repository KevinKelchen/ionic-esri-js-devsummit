# ionic-esri-js-devsummit

The Ionic Angular PWA sample app using esri 4.x referenced in the talk *Write One, Run Anywhere: Hybrid PWAs with Ionic and the JavaScript API*: https://youtu.be/NnDnjWkk8Qo

The talk is an extended version of the 2020 Esri Developer Summit User Presentation talk that did not take place as scheduled in Palm Springs, California on March 12, 2020 due to the spread of coronavirus.

## Getting Started
General Ionic framework documentation can be found [here](https://ionicframework.com/docs).

### Initial Dependencies and Serving in the Web Browser
- Make sure you have **at least Node.js 10.x** installed. Verify from the terminal the version with
  - `node -v`
  - You may first need to uninstall a previous version.
- Make sure you have **at least npm 6.x** installed--it comes with Node.js. Verify from the terminal the version with
  - `npm -v`
  - You may first need to uninstall a previous version.
- Install project local dependencies with
  - `npm ci`
- You should now be able to launch and debug the web app in the browser with
  - `npx ionic serve`
  
### Native Deployments
See the [Capacitor docs](https://capacitor.ionicframework.com/docs/) for the [required dependencies](https://capacitor.ionicframework.com/docs/getting-started/dependencies) and how to open and run the app on [iOS](https://capacitor.ionicframework.com/docs/ios) and [Android](https://capacitor.ionicframework.com/docs/android).
