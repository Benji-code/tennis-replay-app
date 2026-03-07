import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService, Client } from '../../services/storage.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  form: FormGroup;
  client: Client | null = null;
  message = '';
  messageType = '';

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({ name: [''], notes: [''], leftHanded: [false], oneHandBackhand: [false] });
  }

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const clients = await this.storage.getClients();
    this.client = clients.find(c => c.id === id) || null;
    if (this.client) {
      this.form.setValue({
        name: this.client.name,
        notes: this.client.notes,
        leftHanded: this.client.leftHanded,
        oneHandBackhand: this.client.oneHandBackhand
      });
    }
  }

  async save() {
    const v = this.form.value;
    if (!v.name?.trim()) { this.message = 'Name is required.'; this.messageType = 'error'; return; }
    await this.storage.updateClient({ ...this.client!, ...v, name: v.name.trim() });
    this.message = 'Saved!';
    this.messageType = 'success';
    setTimeout(() => this.router.navigate(['/clients']), 700);
  }

  back() { this.router.navigate(['/clients']); }
}
