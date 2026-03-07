import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService, Client } from '../../services/storage.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  filtered: Client[] = [];
  search = '';

  constructor(
    private storage: StorageService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.load();
  }

  async load() {
    this.clients = await this.storage.getClients();
    this.applySearch();
  }

  applySearch() {
    const q = this.search.toLowerCase();
    this.filtered = this.clients.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.notes || '').toLowerCase().includes(q)
    );
  }

  edit(client: Client) {
    this.router.navigate(['/edit-client', client.id]);
  }

  async delete(client: Client) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { name: client.name },
      panelClass: 'dark-dialog'
    });
    ref.afterClosed().subscribe(async result => {
      if (result) {
        await this.storage.deleteClient(client.id!);
        await this.load();
      }
    });
  }
}
