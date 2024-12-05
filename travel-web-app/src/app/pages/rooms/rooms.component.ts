import { Component } from '@angular/core';
import { Room } from '../../interfaces/room';
import { RoomsService } from '../../services/rooms.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  protected rooms: Array<Room> = []
  constructor(roomsService: RoomsService, private router: Router) {
    roomsService.getAllRooms().subscribe((rooms) => {
      this.rooms = rooms;      
    });
  }

  navigateTo(roomId: string): void {
    this.router.navigate([`/rooms/${roomId}`]);
  }
}
