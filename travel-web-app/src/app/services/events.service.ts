import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient) {}

  public getAllEvents(): Observable<Array<Event>> {
    return this.http.get<Array<Event>>('http://localhost:3000/events');
  }

  public getEventById(eventId: string): Observable<Event | undefined> {    
    return this.http.get<Event | undefined>(`http://localhost:3000/events/${eventId}`);
  }

  public isEventAvailable(eventId: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:3000/event-availability/${eventId}`);
  }
}
