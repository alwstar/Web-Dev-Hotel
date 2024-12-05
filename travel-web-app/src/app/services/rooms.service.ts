import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor(private http: HttpClient) {}

  public getAllRooms(): Observable<Array<Room>> {
    return this.http.get<Array<Room>>('http://localhost:3000/rooms');
  }

  public getRoomById(roomId: string): Observable<Room | undefined> {
    return this.http.get<Room | undefined>(`http://localhost:3000/rooms/${roomId}`);
  }

  public isRoomAvailable(roomId: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:3000/room-availability/${roomId}`);
  }
}
