import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService, Client } from '../../services/storage.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  form: FormGroup;
  clients: Client[] = [];
  selectedFile: File | null = null;
  message = '';
  messageType = '';
  uploading = false;

  swingTypes = ['First Serve', 'Second Serve', 'Forehand', 'Backhand', 'Volley', 'Smash'];

  constructor(private fb: FormBuilder, private storage: StorageService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      swingType: ['', Validators.required],
      contactPoint: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      notes: [''],
      leftHanded: [false],
      oneHandBackhand: [false],
      linkedClient: ['none']
    });
  }

  async ngOnInit() {
    this.clients = await this.storage.getClients();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) this.selectedFile = file;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  async submit() {
    this.message = '';
    const v = this.form.value;

    if (!v.name?.trim()) { this.setMsg('error', 'Name is required.'); return; }
    if (!v.swingType)    { this.setMsg('error', 'Swing type is required.'); return; }
    if (!v.contactPoint || isNaN(v.contactPoint)) { this.setMsg('error', 'Contact point must be a number (seconds).'); return; }
    if (!this.selectedFile) { this.setMsg('error', 'Please select an MP4 video file.'); return; }

    this.uploading = true;
    try {
      await this.storage.addVideo(
        {
          name: v.name.trim(),
          swingType: v.swingType,
          contactPoint: parseFloat(v.contactPoint),
          notes: v.notes || '',
          leftHanded: v.leftHanded,
          oneHandBackhand: v.oneHandBackhand,
          linkedClient: v.linkedClient || 'none',
          fileName: this.selectedFile.name,
          fileSize: this.selectedFile.size
        },
        this.selectedFile
      );
      this.setMsg('success', `"${v.name.trim()}" saved successfully!`);
      this.form.reset({ name: '', swingType: '', contactPoint: '', notes: '', leftHanded: false, oneHandBackhand: false, linkedClient: 'none' });
      this.selectedFile = null;
      this.fileInput.nativeElement.value = '';
    } catch (e) {
      this.setMsg('error', 'Failed to save video. Please try again.');
    } finally {
      this.uploading = false;
    }
  }

  private setMsg(type: string, text: string) {
    this.messageType = type;
    this.message = text;
  }
}
