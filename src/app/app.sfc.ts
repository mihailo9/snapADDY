import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FromInjector } from '@core/util';
import { AppStore, State } from '@core/api/store';
import { SchedulerSFC } from '@core/features/scheduler/scheduler.sfc';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ion-app *ngIf="vm$ | async as vm">
      <ion-router-outlet
        (activate)="onOutletLoaded($event, vm)"
      ></ion-router-outlet>
    </ion-app>
  `,
})
export class AppSFC implements OnInit {
  store = this.fromInjector.get(AppStore);

  vm$ = this.store.vm$;

  constructor(private readonly fromInjector: FromInjector) {}

  ngOnInit(): void {
    this.store.fetchData();
  }

  onOutletLoaded(component: SchedulerSFC, view: State) {
    component.store.updateResurcesFromRooms(view.rooms);
  }
}

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
    ReactiveFormsModule,
    MbscModule,
    BrowserModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppSFC],
})
export class AppModule {}
