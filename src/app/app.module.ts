import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { MyApp } from './app.component';
import { CurrentWeekPage } from '../pages/current-week/current-week';
import { ArchivePage } from '../pages/archive/archive';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    CurrentWeekPage,
    ArchivePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase, 'tasks-manager')
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CurrentWeekPage,
    ArchivePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
