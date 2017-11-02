import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';

// Page imports
import {HomePage} from '../pages/home/home';
import {AboutPage} from '../pages/about/about';
import {LanguageSetPage} from '../pages/language-set/language-set';
import {SettingsPage} from '../pages/settings/settings';
import {ListPage} from '../pages/list/list';
import {QuizTestSelectPage} from '../pages/quiz-test-select/quiz-test-select';
import {QuizResultsPage} from '../pages/quiz-results/quiz-results';

// Provider
import {Database} from '../providers/database';
import {Appsettings} from '../providers/appsettings';
import {UpdateProvider} from '../providers/update-provider';


@Component({
    templateUrl: 'app.html',
    providers: [Database, Appsettings, UpdateProvider]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    // Set the root page of the application (opens after splash-screen)
    rootPage: any = HomePage;
    MainMenu: Array<{ title: string, component: any }>;
    OtherMenu: Array<{ title: string, component: any }>;

    constructor(public platform: Platform,
                public menu: MenuController,
                private database: Database,
                public statusbar: StatusBar) {
        platform.ready().then(() => {
            statusbar.styleDefault();
        });
        this.initializeApp();


        // Define the available pages for this app
        this.MainMenu = [
            {title: 'Startpagina', component: HomePage},
            {title: 'Taalset kiezen', component: LanguageSetPage},
            {title: 'Categorien', component: ListPage},
           // {title: 'Toetsing', component: QuizTestSelectPage},
           // {title: 'Toetsresultaten', component: QuizResultsPage},
        ];
        this.OtherMenu = [
            {title: 'Instellingen', component: SettingsPage},
            {title: 'Over deze app', component: AboutPage},
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            console.log("APP READY");
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
        });
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }
}
