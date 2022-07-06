/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  SchedulerPopupFormDeleteBtnSFC,
  SchedulerPopupFormSFC,
} from '@core/features/scheduler/scheduler-popup/scheduler-popup-form';

import {
  SchedulerPopupOptionsService,
  SchedulerPopupButtonsService,
  SchedulerPopupActionsService,
  SchedulerPopupFormService,
  IEventPayload,
} from '@core/features/scheduler/services';
import { IDispatchedEvent } from '@core/models/IDispatchedEvent';

import { MbscCalendarEvent, MbscModule, MbscPopup } from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-event-popup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <mbsc-popup
      [options]="schedulerPopupOptionsService?.popupOptions"
      [anchor]="schedulerPopupActionsService.popupAnchor"
      [headerText]="schedulerPopupActionsService.popupHeaderText"
      [buttons]="schedulerPopupButtonsService?.popupButtons"
      #popup
    >
      <app-scheduler-popup-form
        [form]="schedulerPopupFormService.form"
      ></app-scheduler-popup-form>
      <div
        *ngIf="schedulerPopupActionsService.isEdit"
        class="mbsc-button-group"
      >
        <app-scheduler-popup-form-delete-btn></app-scheduler-popup-form-delete-btn>
      </div>
    </mbsc-popup>
  `,
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MbscModule,
    SchedulerPopupFormDeleteBtnSFC,
    SchedulerPopupFormSFC,
  ],
})
export class SchedulerEventPopupSFC {
  @ViewChild('popup', { static: false })
  popup!: MbscPopup;

  @Input() events: MbscCalendarEvent[];

  @Input() set dispatchedEvent(payload: IDispatchedEvent) {
    if (payload) {
      this.handleDispatchedEvent(payload);
    }
  }

  @Output() readonly updateEvents$: EventEmitter<MbscCalendarEvent[]> =
    new EventEmitter();

  constructor(
    protected readonly schedulerPopupOptionsService: SchedulerPopupOptionsService,
    protected readonly schedulerPopupButtonsService: SchedulerPopupButtonsService,
    protected readonly schedulerPopupActionsService: SchedulerPopupActionsService,
    protected readonly schedulerPopupFormService: SchedulerPopupFormService
  ) {}

  handleDispatchedEvent(payload: IDispatchedEvent) {
    const _payload: IEventPayload = {
      event: payload.event,
      events: this.events,
      popup: this.popup,
      callback: (events) => {
        this.updateEvents$.emit(events);
      },
    };

    this.schedulerPopupActionsService.actions(payload.type, _payload);
  }
}
