import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
})
export class AppSFC {}

const routes: Routes = [
  {
    path: 'scheduler',
    loadChildren: () =>
      import('./features/scheduler/scheduler.sfc').then(
        (m) => m.SchedulerModule
      ),
  },
  {
    path: '',
    redirectTo: 'scheduler',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [AppSFC],
  imports: [
    FormsModule,
    MbscModule,
    BrowserModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppSFC],
})
export class AppModule {}
