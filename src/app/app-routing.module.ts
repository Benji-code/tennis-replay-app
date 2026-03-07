import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoPlayerComponent }  from './pages/video-player/video-player.component';
import { AddVideoComponent }     from './pages/add-video/add-video.component';
import { VideoListComponent }    from './pages/video-list/video-list.component';
import { AddClientComponent }    from './pages/add-client/add-client.component';
import { ClientListComponent }   from './pages/client-list/client-list.component';
import { EditClientComponent }   from './pages/edit-client/edit-client.component';
import { EditVideoComponent }    from './pages/edit-video/edit-video.component';

const routes: Routes = [
  { path: '',             redirectTo: 'player', pathMatch: 'full' },
  { path: 'player',      component: VideoPlayerComponent },
  { path: 'add-video',   component: AddVideoComponent },
  { path: 'videos',      component: VideoListComponent },
  { path: 'add-client',  component: AddClientComponent },
  { path: 'clients',     component: ClientListComponent },
  { path: 'edit-client/:id', component: EditClientComponent },
  { path: 'edit-video/:id',  component: EditVideoComponent },
  { path: '**',          redirectTo: 'player' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
