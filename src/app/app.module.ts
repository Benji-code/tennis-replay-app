import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatSidenavModule }   from '@angular/material/sidenav';
import { MatToolbarModule }   from '@angular/material/toolbar';
import { MatListModule }      from '@angular/material/list';
import { MatIconModule }      from '@angular/material/icon';
import { MatButtonModule }    from '@angular/material/button';
import { MatInputModule }     from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule }    from '@angular/material/select';
import { MatRadioModule }     from '@angular/material/radio';
import { MatDialogModule }    from '@angular/material/dialog';
import { MatTooltipModule }   from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Pages
import { VideoPlayerComponent }  from './pages/video-player/video-player.component';
import { AddVideoComponent }     from './pages/add-video/add-video.component';
import { VideoListComponent }    from './pages/video-list/video-list.component';
import { AddClientComponent }    from './pages/add-client/add-client.component';
import { ClientListComponent }   from './pages/client-list/client-list.component';
import { EditClientComponent }   from './pages/edit-client/edit-client.component';
import { EditVideoComponent }    from './pages/edit-video/edit-video.component';

// Shared
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

// Services
import { StorageService } from './services/storage.service';
import { PlayerService }  from './services/player.service';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    AddVideoComponent,
    VideoListComponent,
    AddClientComponent,
    ClientListComponent,
    EditClientComponent,
    EditVideoComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  providers: [StorageService, PlayerService],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
