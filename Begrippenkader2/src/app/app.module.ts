import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SQLite } from '@ionic-native/sqlite';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';


// Page imports
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { EntryDetailsPage } from '../pages/entry-details/entry-details';
import { LanguageSetPage } from '../pages/language-set/language-set';
import { SettingsPage } from '../pages/settings/settings';
import { LanguageSetDetailPage } from '../pages/language-set-detail/language-set-detail';
import { LanguageSetAddPage } from '../pages/language-set-add/language-set-add';
import { ListPage } from '../pages/list/list';
import { ListDetailPage } from '../pages/list-detail/list-detail';
import { QuizTestSelectPage } from '../pages/quiz-test-select/quiz-test-select';
import { QuizResultsPage } from '../pages/quiz-results/quiz-results';
import { QuizTestPage } from '../pages/quiz-test/quiz-test';
import { QuizTestResultPage } from '../pages/quiz-test-result/quiz-test-result';

// Provider imports
import { Database } from '../providers/database';
import { Appsettings } from '../providers/appsettings';
import { UpdateProvider } from '../providers/update-provider';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AboutPage,
        EntryDetailsPage,
        LanguageSetPage,
        SettingsPage,
        LanguageSetDetailPage,
        LanguageSetAddPage,
        ListPage,
        ListDetailPage,
        QuizTestPage,
        QuizResultsPage,
        QuizTestSelectPage,
        QuizTestResultPage,
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        ChartsModule,
        BrowserModule,
        HttpModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AboutPage,
        EntryDetailsPage,
        LanguageSetPage,
        SettingsPage,
        LanguageSetDetailPage,
        LanguageSetAddPage,
        ListPage,
        ListDetailPage,
        QuizTestPage,
        QuizResultsPage,
        QuizTestSelectPage,
        QuizTestResultPage,
    ],
    providers: [Database, Appsettings,  StatusBar, UpdateProvider,SQLite, HTTP]
})
export class AppModule {}
