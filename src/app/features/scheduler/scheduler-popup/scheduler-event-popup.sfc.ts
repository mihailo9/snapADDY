/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
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
  SchedulerOptionsService,
  SchedulerPopupButtonsService,
  SchedulerPopupFormService,
} from '@core/features/scheduler/services';
import {
  DispatchEventType,
  IDispatchedEvent,
} from '@core/models/IDispatchedEvent';

import { FromInjector } from '@core/util/from-injector';
import {
  MbscCalendarEvent,
  MbscEventClickEvent,
  MbscEventCreatedEvent,
  MbscModule,
  MbscPopup,
  Notifications,
} from '@mobiscroll/angular';

@Component({
  selector: 'app-scheduler-event-popup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <mbsc-popup
      [options]="schedulerPopupOptionsService?.popupOptions"
      [anchor]="popupAnchor"
      [headerText]="popupHeaderText"
      [buttons]="schedulerPopupButtonsService?.popupButtons"
      #popup
    >
      <app-scheduler-popup-form
        [form]="schedulerPopupFormService.form"
      ></app-scheduler-popup-form>
      <div *ngIf="isEdit" class="mbsc-button-group">
        <app-scheduler-popup-form-delete-btn
          (click$)="onDeleteClick()"
        ></app-scheduler-popup-form-delete-btn>
      </div>
    </mbsc-popup>
  `,
  providers: [Notifications],
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
      switch (payload.type) {
        case DispatchEventType.click:
          console.log(payload.type);
          this.onEventClick(payload.event as MbscEventClickEvent);
          break;
        case DispatchEventType.created:
          console.log(payload.type);
          this.onEventCreated(payload.event as MbscEventCreatedEvent);
          break;
        case DispatchEventType.deleted:
          console.log(payload.type);
          this.deleteEvent(payload.event);
          break;
        case DispatchEventType.update:
        case DispatchEventType.create:
          console.log(payload.type);
          break;
        case DispatchEventType.updated:
          break;
        case DispatchEventType.cancel:
          if (!this.isEdit) {
            console.log(payload.type);
            // refresh the list, if add popup was canceled, to remove the temporary event
            // this.events = [...this.events];
            // this.updateEvents$.emit(this.events);
          }
          break;
        case DispatchEventType.add:
        case DispatchEventType.edit:
          console.log(payload.type);
          this.saveEvent();
          break;

        default:
          console.log(payload);
          break;
      }
    }
  }

  @Output() readonly updateEvents$: EventEmitter<MbscCalendarEvent[]> =
    new EventEmitter();

  isEdit: boolean;
  tempEvent!: MbscCalendarEvent;

  popupHeaderText!: string;
  popupAnchor: HTMLElement | undefined;

  protected readonly schedulerOptionsService = this.fromInjector.get(
    SchedulerOptionsService
  );

  protected readonly schedulerPopupButtonsService = this.fromInjector.get(
    SchedulerPopupButtonsService
  );

  protected readonly schedulerPopupFormService = this.fromInjector.get(
    SchedulerPopupFormService
  );

  protected readonly schedulerPopupOptionsService = this.fromInjector.get(
    SchedulerPopupOptionsService
  );

  constructor(
    private notify: Notifications,
    private readonly fromInjector: FromInjector
  ) {}

  loadPopupForm({ title, start, end }: MbscCalendarEvent): void {
    const form = {
      popupEventTitle: title,
      popupEventDates: [start, end],
    };
    this.schedulerPopupFormService.patchForm(form);
  }
  saveEvent(): void {
    const _event = {
      ...this.tempEvent,
      title: this.schedulerPopupFormService.getControlValue('popupEventTitle'),
      start:
        this.schedulerPopupFormService.getControlValue('popupEventDates')[0],
      end: this.schedulerPopupFormService.getControlValue('popupEventDates')[1],
    };

    console.log(_event);
    if (this.isEdit) {
      // update the event in the list
      this.updateEvents$.emit(this.events);
      // here you can update the event in your storage as well
      // ...
    } else {
      // add the new event to the list
      this.updateEvents$.emit([...this.events, _event]);
      // here you can add the event to your storage as well
      // ...
    }
    // navigate the calendar
    //TO DO
    // this.schedulerPopupFormService.form = {
    //   ...this.schedulerPopupFormService.form,
    //   calendarSelectedDate:
    //     this.schedulerPopupFormService.form.popupEventDates[0],
    // };

    // close the popup
    this.popup.close();
  }
  deleteEvent(event: MbscCalendarEvent): void {
    this.events = this.events.filter((item) => item.id !== event.id);
    this.notify.snackbar({
      button: {
        action: () => {
          // this.events = [...this.events, event];
          this.updateEvents$.emit([...this.events, event]);
        },
        text: 'Undo',
      },
      message: 'Event deleted',
    });
    // here you can delete the event from your storage as well
    // ...
  }
  onDeleteClick(): void {
    this.deleteEvent(this.tempEvent);
    this.popup.close();
  }

  private onEventClick(evt: MbscEventClickEvent) {
    this.isEdit = true;
    this.tempEvent = evt.event;
    //   // fill popup form with event data
    this.loadPopupForm(evt.event);
    //   // set popup options
    this.popupHeaderText = 'Edit event';
    this.schedulerPopupButtonsService.setPopupButtons(
      this.schedulerPopupButtonsService.getPopupEditButtons()
    );
    this.popupAnchor = evt.domEvent.currentTarget;
    //   // open the popup
    this.popup.open();
  }

  private onEventCreated(evt: MbscEventCreatedEvent) {
    this.isEdit = false;
    this.tempEvent = { ...evt.event };
    // // fill popup form with event data
    this.loadPopupForm(evt.event);
    // // set popup options
    this.popupHeaderText = 'New Event';
    this.schedulerPopupButtonsService.setPopupButtons(
      this.schedulerPopupButtonsService.getPopupAddButtons()
    );
    this.popupAnchor = evt.target;
    // // open the popup
    this.popup.open();
  }
}
