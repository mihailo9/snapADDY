import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-room-header-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header-resource-template-content">
      <img class="header-resource-avatar" [src]="room.img" />

      <div class="header-resource-name">{{ room?.name }}</div>
    </div>
  `,
})
export class RoomheaderItemSFC {
  @Input() room;
}
