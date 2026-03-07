import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService, VideoEntry, Client } from '../../services/storage.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  form: FormGroup;
  video: VideoEntry | null = null;
  clients: Client[] = [];
  selectedFile: File | null = null;
  message = '';
  messageType = '';
  saving = false;

  swingTypes = ['First Serve', 'Second Serve', 'Forehand', 'Backhand', 'Volley', 'Smash'];

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: [''], swingType: [''], contactPoint: [''],
      notes: [''], leftHanded: [false], oneHandBackhand: [false], linkedClient: ['none']
    });
  }

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const videos = await this.storage.getVideos();
    this.video = videos.find(v => v.id === id) || null;
    this.clients = await this.storage.getClients();
    if (this.video) {
      this.form.setValue({
        name: this.video.name, swingType: this.video.swingType,
        contactPoint: this.video.contactPoint, notes: this.video.notes,
        leftHanded: this.video.leftHanded, oneHandBackhand: this.video.oneHandBackhand,
        linkedClient: this.video.linkedClient
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  async save() {
    const v = this.form.value;
    if (!v.name?.trim()) { this.message = 'Name is required.'; this.messageType = 'error'; return; }
    if (!v.swingType)    { this.message = 'Swing type is required.'; this.messageType = 'error'; return; }
    if (isNaN(v.contactPoint)) { this.message = 'Contact point must be a number.'; this.messageType = 'error'; return; }

    this.saving = true;
    const updated: VideoEntry = {
      ...this.video!,
      name: v.name.trim(), swingType: v.swingType,
      contactPoint: parseFloat(v.contactPoint), notes: v.notes,
      leftHanded: v.leftHanded, oneHandBackhand: v.oneHandBackhand,
      linkedClient: v.linkedClient,
      fileName: this.selectedFile ? this.selectedFile.name : this.video!.fileName,
      fileSize: this.selectedFile ? this.selectedFile.size : this.video!.fileSize,
    };

    if (this.selectedFile) {
      await this.storage.updateVideoWithFile(updated, this.selectedFile);
    } else {
      await this.storage.updateVideo(updated);
    }

    this.saving = false;
    this.message = 'Saved!';
    this.messageType = 'success';
    setTimeout(() => this.router.navigate(['/videos']), 700);
  }

  back() { this.router.navigate(['/videos']); }
}
