import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
// import { ScheduleRoutingModule } from './scheduler-routing.module';

@Component({
  selector: 'app-scheduler',
  template: ``,
})
export class SchedulerSFC {}

const routes: Routes = [
  {
    path: '',
    component: SchedulerSFC,
  },
];

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [SchedulerSFC]
})
export class SchedulerModule {}
