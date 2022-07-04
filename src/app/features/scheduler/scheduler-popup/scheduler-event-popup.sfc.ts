/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulerPopupFormDeleteBtnSFC } from '@core/features/scheduler/scheduler-popup/scheduler-popup-form/scheduler-popup-form-delete-btn.sfc';
import { SchedulerPopupFormSFC } from '@core/features/scheduler/scheduler-popup/scheduler-popup-form/scheduler-popup-form.sfc';
import { SchedulerOptionsService } from '@core/features/scheduler/services/scheduler-options.service';
import { SchedulerPopupButtonsService } from '@core/features/scheduler/services/scheduler-popup-buttons.service';
import { SchedulerPopupColorService } from '@core/features/scheduler/services/scheduler-popup-color.service';
import { SchedulerPopupDatepickerService } from '@core/features/scheduler/services/scheduler-popup-datepicker.service';
import { SchedulerPopupFormService } from '@core/features/scheduler/services/scheduler-popup-form.service';
import { SchedulerPopupOptionsService } from '@core/features/scheduler/services/scheduler-popup-options.service';
import { FromInjector } from '@core/util/from-injector';
import {
  MbscCalendarEvent,
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
      <app-scheduler-popup-form></app-scheduler-popup-form>
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
export class SchedulerEventPopupSFC implements OnInit {
  @ViewChild('popup', { static: false })
  popup!: MbscPopup;

  @Input() events: MbscCalendarEvent[];

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

  protected readonly schedulerPopupColorService = this.fromInjector.get(
    SchedulerPopupColorService
  );

  protected readonly schedulerPopupDatepickerService = this.fromInjector.get(
    SchedulerPopupDatepickerService
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

  ngOnInit(): void {
    this.schedulerOptionsService.eventClick$.subscribe((evt) => {
      console.log(evt);
      this.isEdit = true;
      this.tempEvent = evt.event;
      //   // fill popup form with event data
      this.loadPopupForm(evt.event);
      //   // set popup options
      this.popupHeaderText = 'Edit event';
      this.schedulerPopupButtonsService.setPopupButtons(
        this.schedulerPopupButtonsService.getPopupEditButtons()
      );
      //   this.popupButtons = this.popupEditButtons;
      this.popupAnchor = evt.domEvent.currentTarget;
      //   // open the popup
      this.popup.open();
    });

    this.schedulerOptionsService.eventCreated$.subscribe((evt) => {
      console.log(evt);
      this.isEdit = false;
      this.tempEvent = evt.event;
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
    });

    this.schedulerOptionsService.eventDeleted$.subscribe((evt) => {
      console.log(evt);
      this.deleteEvent(evt.event);
    });

    this.schedulerOptionsService.eventUpdated$.subscribe((evt) => {
      console.log(evt);
    });

    this.schedulerPopupButtonsService.buttonClick$.subscribe((evt) => {
      console.log(evt);
      this.saveEvent();
    });

    this.schedulerPopupOptionsService.popupClose$.subscribe((evt) => {
      console.log(evt);
      if (!this.isEdit) {
        // refresh the list, if add popup was canceled, to remove the temporary event
        this.events = [...this.events];
      }
    });
  }

  loadPopupForm({
    title,
    start,
    end,
    color,
  }: MbscCalendarEvent): void {
    this.schedulerPopupFormService.popupEventTitle = title;
    this.schedulerPopupFormService.popupEventDates = [start, end];
    this.schedulerPopupColorService.selectedColor = color || '';
  }
  saveEvent(): void {
    this.tempEvent.title = this.schedulerPopupFormService.popupEventTitle;
    this.tempEvent.start = this.schedulerPopupFormService.popupEventDates[0];
    this.tempEvent.end = this.schedulerPopupFormService.popupEventDates[1];
    this.tempEvent.color = this.schedulerPopupColorService.selectedColor;
    if (this.isEdit) {
      // update the event in the list
      this.events = [...this.events];
      // here you can update the event in your storage as well
      // ...
    } else {
      // add the new event to the list
      this.events = [...this.events, this.tempEvent];
      // here you can add the event to your storage as well
      // ...
    }
    // navigate the calendar
    this.schedulerPopupFormService.calendarSelectedDate =
      this.schedulerPopupFormService.popupEventDates[0];
    // this.calendarSelectedDate = this.popupEventDates[0];
    // close the popup
    this.popup.close();
  }
  deleteEvent(event: MbscCalendarEvent): void {
    this.events = this.events.filter((item) => item.id !== event.id);
    this.notify.snackbar({
      button: {
        action: () => {
          this.events = [...this.events, event];
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
}
