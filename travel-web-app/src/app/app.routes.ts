import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { EventDetailedComponent } from './pages/event-detailed/event-detailed.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RoomDetailedComponent } from './pages/room-detailed/room-detailed.component';
import { MediaComponent } from './pages/media/media.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'events', component: EventsComponent, title: 'Events' },
    { path: 'events/:id', component: EventDetailedComponent, title: 'Specific Event' },
    { path: 'rooms', component: RoomsComponent, title: 'Rooms' },
    { path: 'rooms/:id', component: RoomDetailedComponent, title: 'Specific Rooms' },
    { path: 'media', component: MediaComponent, title: 'Media' },
    { path: '**', redirectTo: '' },];
