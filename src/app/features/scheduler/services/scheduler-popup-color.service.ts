/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { MbscPopupOptions } from '@mobiscroll/angular';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SchedulerPopupColorService {
  private readonly close: Subject<void> = new Subject();

  private readonly open: Subject<void> = new Subject();

  readonly close$ = this.close.asObservable();

  readonly open$ = this.open.asObservable();

  tempColor = '';
  selectedColor = '';
  colorAnchor: HTMLElement | undefined;
  colors = [
    '#ffeb3c',
    '#ff9900',
    '#f44437',
    '#ea1e63',
    '#9c26b0',
    '#3f51b5',
    '',
    '#009788',
    '#4baf4f',
    '#7e5d4e',
  ];

  colorOptions: MbscPopupOptions = {
    display: 'bottom',
    contentPadding: false,
    showArrow: false,
    showOverlay: false,
    buttons: [
      'cancel',
      {
        text: 'Set',
        keyCode: 'enter',
        handler: (ev) => {
          this.selectedColor = this.tempColor;
          //   this.colorPicker.close();
          this.close.next();
        },
        cssClass: 'mbsc-popup-button-primary',
      },
    ],
    responsive: {
      medium: {
        display: 'anchored',
        buttons: [],
      },
    },
  };

  selectColor(color: string): void {
    this.tempColor = color;
  }

  openColorPicker(ev: any): void {
    this.selectColor(this.selectedColor || '');
    this.colorAnchor = ev.currentTarget;
    this.open.next();
  }

  changeColor(ev: any, colorPickerButtonsLength: number): void {
    const color = ev.currentTarget.getAttribute('data-value');
    this.selectColor(color);

    // if (!this.colorPicker.s.buttons.length) {
    if (!colorPickerButtonsLength) {
      this.selectedColor = color;
      this.close.next();
    }
  }
}
