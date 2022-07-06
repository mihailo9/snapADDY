import { Injectable } from '@angular/core';
import { Notifications } from '@mobiscroll/angular';

export interface ISnackbarWithAction {
  action: any;
  text: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotifierService {
  constructor(private readonly notify: Notifications) {}
  snackbarWithAction({ action, text, message }: ISnackbarWithAction) {
    this.notify.snackbar({
      button: {
        action: () => {
          action();
        },
        text,
      },
      message,
    });
  }

  snackbar(message: string) {
    this.notify.snackbar({ message });
  }
}
