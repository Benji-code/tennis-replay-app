import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService, PlayerSlot } from '../../services/player.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {
  @ViewChild('vid1') vid1!: ElementRef<HTMLVideoElement>;
  @ViewChild('vid2') vid2!: ElementRef<HTMLVideoElement>;

  constructor(public player: PlayerService, private router: Router) {}

  get slot1(): PlayerSlot | null { return this.player.slot1; }
  get slot2(): PlayerSlot | null { return this.player.slot2; }

  playing = false;
  speed = 1;

  async syncAndPlay() {
    this.playing = true;
    if (this.slot1 && this.vid1?.nativeElement) {
      this.vid1.nativeElement.currentTime = this.slot1.video.contactPoint;
    }
    if (this.slot2 && this.vid2?.nativeElement) {
      this.vid2.nativeElement.currentTime = this.slot2.video.contactPoint;
    }

    this.vid1?.nativeElement?.play();
    this.vid2?.nativeElement?.play();
  }

  togglePlayPause() {
    this.playing = !this.playing;
    if (this.playing) {
      this.vid1?.nativeElement?.play();
      this.vid2?.nativeElement?.play();
    } else {
      this.vid1?.nativeElement?.pause();
      this.vid2?.nativeElement?.pause();
    }
  }

  setSpeed(value: number) {
    this.speed = value;
    if (this.vid1?.nativeElement) this.vid1.nativeElement.playbackRate = value;
    if (this.vid2?.nativeElement) this.vid2.nativeElement.playbackRate = value;
  }

  goToLibrary() {
    this.router.navigate(['/videos']);
  }
}