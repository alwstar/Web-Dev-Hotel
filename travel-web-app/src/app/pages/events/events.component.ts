import { Component } from '@angular/core';
import { Event } from '../../interfaces/event';
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  protected events: Array<Event> = []
  constructor(eventsService: EventsService, private router: Router) {
    eventsService.getAllEvents().subscribe((events) => {
      this.events = events;
    });
  }

  navigateTo(eventId: string): void {
    this.router.navigate([`/events/${eventId}`]);
  }
}
