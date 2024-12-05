import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../interfaces/room';
import { RoomsService } from '../../services/rooms.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderDialog } from '../../components/order-dialog/order-dialog';
import { OrderData } from '../../interfaces/order-data';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RoomBooking } from '../../interfaces/room-booking';

@Component({
  selector: 'app-room-detailed',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatButtonModule, MatIconModule, MatCardModule, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './room-detailed.component.html',
  styleUrl: './room-detailed.component.css',
  providers: [provideNativeDateAdapter()],
})
export class RoomDetailedComponent implements OnInit {
  @Input()
  set id(roomId: string) {
    this.roomService.getRoomById(roomId).subscribe((room: Room | undefined) => {
      this.room = room;
    });
  }

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  protected room: Room | undefined;
  protected nights?: number;
  protected isAvailable: boolean = false;

  constructor(
    private roomService: RoomsService,
    private dialog: MatDialog,
    private orderService: OrderService,
    protected sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.range.valueChanges.subscribe(value => {      
      if (value.start && value.end) {
        const startDate = new Date(value.start);
        const endDate = new Date(value.end);
        const diffInMs = endDate.getTime() - startDate.getTime();
        const nights = diffInMs / (1000 * 60 * 60 * 24);
        this.nights = nights;

        this.checkAvailibility();
      }
    });
  }

  protected openOrderDialog(): void {
    if (this.room && this.nights) {

      const dialogRef = this.dialog.open(OrderDialog, {
        data: { price: this.room?.price * this.nights },
      });

      dialogRef.afterClosed().subscribe((personalInformation) => {
        if (!personalInformation) {
          return;
        }

        if (this.room && this.nights && this.range.value.start && this.range.value.end) {
          const roomBooking: RoomBooking = {
            id: this.room.id,
            name: this.room.name,
            price: this.room.price,
            nights: this.nights,
            start: this.range.value.start,
            end: this.range.value.end
          }
          const orderData: OrderData = {
            customer_name: personalInformation.name,
            address: personalInformation.address,
            item: roomBooking,
            mail: personalInformation.email,
          };
          this.orderService.executeOrder(orderData).subscribe();
        }
      });
    }
  }
  protected checkAvailibility(): void {
    if (this.room) {
      
      this.roomService.isRoomAvailable(this.room?.id).subscribe((isAvailable) => {
        this.isAvailable = isAvailable;
      })
    }
  }
}

