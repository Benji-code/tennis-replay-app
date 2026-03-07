import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
  form: FormGroup;
  message = '';
  messageType = '';

  constructor(private fb: FormBuilder, private storage: StorageService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      notes: [''],
      leftHanded: [false],
      oneHandBackhand: [false]
    });
  }

  async submit() {
    this.message = '';
    const { name, notes, leftHanded, oneHandBackhand } = this.form.value;

    if (!name || !name.trim()) {
      this.message = 'Name is required.';
      this.messageType = 'error';
      return;
    }
    if (!isNaN(name.trim())) {
      this.message = 'Name cannot be a number.';
      this.messageType = 'error';
      return;
    }

    const existing = await this.storage.getClients();
    if (existing.some(c => c.name.toLowerCase() === name.trim().toLowerCase())) {
      this.message = 'A client with this name already exists.';
      this.messageType = 'error';
      return;
    }

    await this.storage.addClient({ name: name.trim(), notes, leftHanded, oneHandBackhand });
    this.message = `${name.trim()} added successfully!`;
    this.messageType = 'success';
    this.form.reset({ name: '', notes: '', leftHanded: false, oneHandBackhand: false });
  }
}
