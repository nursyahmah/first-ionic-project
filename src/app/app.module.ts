import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { MainService } from './api/main/main.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    AppRoutingModule,
    IonicStorageModule,
    HttpClientModule,
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  },
  StatusBar,
  MainService,
  Storage
  ],
  bootstrap: [AppComponent],


})
export class AppModule {}
