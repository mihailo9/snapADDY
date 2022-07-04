import { Room } from '@core/models';
import { MbscResource } from '@mobiscroll/angular';

export const mapRoomsToResources = (rooms: Room[]): MbscResource[] =>
  rooms.map(({ id, name, numberOfPeople }) => ({
    id,
    name,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  }));
