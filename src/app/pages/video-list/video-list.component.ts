import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StorageService, VideoEntry } from '../../services/storage.service';
import { PlayerService } from '../../services/player.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  videos: VideoEntry[] = [];
  filtered: VideoEntry[] = [];
  search = '';
  slot1Id: number | null = null;
  slot2Id: number | null = null;
  loadingSlot: number | null = null;

  constructor(
    private storage: StorageService,
    private player: PlayerService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.load();
    // restore any previously selected slots
    this.slot1Id = this.player.slot1?.video.id ?? null;
    this.slot2Id = this.player.slot2?.video.id ?? null;
  }

  async load() {
    this.videos = await this.storage.getVideos();
    this.applySearch();
  }

  applySearch() {
    const q = this.search.toLowerCase();
    this.filtered = this.videos.filter(v =>
      v.name.toLowerCase().includes(q) ||
      v.swingType.toLowerCase().includes(q) ||
      (v.linkedClient || '').toLowerCase().includes(q)
    );
  }

  async selectSlot(slotNum: number, video: VideoEntry) {
    this.loadingSlot = video.id!;
    const url = await this.storage.getVideoObjectUrl(video.id!);
    this.loadingSlot = null;
    if (!url) return;

    if (slotNum === 1) {
      this.player.setSlot1(video, url);
      this.slot1Id = video.id!;
    } else {
      this.player.setSlot2(video, url);
      this.slot2Id = video.id!;
    }
  }

  clearSlot(slotNum: number) {
    if (slotNum === 1) { this.player.clearSlot1(); this.slot1Id = null; }
    else               { this.player.clearSlot2(); this.slot2Id = null; }
  }

  goToPlayer() {
    this.router.navigate(['/player']);
  }

  edit(video: VideoEntry) {
    this.router.navigate(['/edit-video', video.id]);
  }

  async delete(video: VideoEntry) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { name: video.name },
      panelClass: 'dark-dialog'
    });
    ref.afterClosed().subscribe(async result => {
      if (result) {
        await this.storage.deleteVideo(video.id!);
        if (this.slot1Id === video.id) { this.player.clearSlot1(); this.slot1Id = null; }
        if (this.slot2Id === video.id) { this.player.clearSlot2(); this.slot2Id = null; }
        await this.load();
      }
    });
  }
}
