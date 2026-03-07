import { Injectable } from '@angular/core';
import { VideoEntry } from './storage.service';

export interface PlayerSlot {
  video: VideoEntry;
  objectUrl: string;
}

@Injectable({ providedIn: 'root' })
export class PlayerService {
  slot1: PlayerSlot | null = null;
  slot2: PlayerSlot | null = null;

  setSlot1(video: VideoEntry, url: string) {
    this.slot1 = { video, objectUrl: url };
  }

  setSlot2(video: VideoEntry, url: string) {
    this.slot2 = { video, objectUrl: url };
  }

  clearSlot1() { this.slot1 = null; }
  clearSlot2() { this.slot2 = null; }
}
