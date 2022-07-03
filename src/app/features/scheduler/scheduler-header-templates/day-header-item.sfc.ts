import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { formatDate } from '@mobiscroll/angular';

@Component({
  standalone: true,
  selector: 'app-day-header-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header-template-container">
      <div class="header-template-date">
        <div class="header-template-day-name">
          {{ formatDate('DDDD', day?.date) }}
        </div>
        <div class="header-template-day">
          {{ formatDate('MMMM DD', day?.date) }}
        </div>
      </div>
    </div>
  `,
})
export class DayheaderItemSFC {
  @Input() day;

  formatDate = formatDate;
}
