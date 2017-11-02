# Defensie Skeleton Application
The DSA serves as a platform for building Android and iOS applications that comply to the DHD (Digitale Huisstijl Defensie) guidelines.

### Installation
1. Install the latest version of NodeJS (https://nodejs.org/en/)
2. Install the latest version of Cordova `npm install -g cordova`
3. Install the latest version of Ionic `npm install -g ionic`
4. Install the latest version of TypeScript `npm install -g typescript`

Your environment should now be set.

### Running Ionic in the browser
1. CD to the root directory of the application
2. `ionic serve` (appending `-l` renders three views, one for each major platform)

### Building and running for/on iOS
In order to effectively simulate an iOS device you need to have an MacOS enabled device with XCode installed.

Install the following two Node modules:
1. `npm install -g ios-deploy`
2. `npm install -g ios-sim version`

Now the iOS platform can be added to your project.
In order to add the platform, build and run your application, execute the following steps:

1. `ionic platform add ios`
2. `ionic build ios`
3. `ionic run ios`

Build output is stored in the `platforms/ios/build/emulator` folder.

### Building and running for/on Android
Make sure the Android SDK is set up on your machine.

If you have the SDK set up correctly you can execute the following commands to add the platform, build and run your application:

1. `ionic platform add android`
2. `ionic build android`
3. `ionic run android`

Build output is stored in the `platforms/android/build/outputs` folder.

### Adding pages to your ionic project
The Ionic CLI comes with built-in commands for adding pages

`ionic g page name` (replace 'name' with the desired name) will generate a new directory and page files in the `src/app/pages` directory.

In order to make these pages available in your app you must add them to the `declarations` and `entryComponents` lists (after importing them as a component) in `app.module.ts` (can be found in `src/app/`).

If you want to make a page available through the side menu you must import and add your page as a component to the `pages` attribute in `app.component.ts`.

### Adding providers to your ionic project
The Ionic CLI comes with built-in commands for adding pages

`ionic g provider name` (replace 'name' with the desired name) will generate a new file in the `src/app/providers` directory.

In order to make your provider available for your app you must declare them in the `app.module.ts` file (just like your pages). This time however you will only need to pass them as a component (after importing) to the `providers` list.

Your provider can be used on a page after using Dependency Injection to inject it into the constructor of your page.
