import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '../interfaces/media';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private http: HttpClient) {}

  public getAllEvents(): Observable<Media> {
    return this.http.get<Media>('http://localhost:3000/media');
  }
}
