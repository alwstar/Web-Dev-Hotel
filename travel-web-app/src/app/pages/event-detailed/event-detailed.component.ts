import { Component, Input } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialog } from '../../components/order-dialog/order-dialog';
import { OrderData } from '../../interfaces/order-data';
import { OrderService } from '../../services/order.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-event-detailed',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './event-detailed.component.html',
  styleUrl: './event-detailed.component.css'
})
export class EventDetailedComponent {
  @Input()
  set id(eventId: string) {    
    this.eventService.getEventById(eventId).subscribe((event: Event | undefined) => {
      this.event = event;
      if (event) {
        this.eventDate = new Date(event.date)
      }
    });
    this.eventService.isEventAvailable(eventId).subscribe((isAvailable: Boolean) => {
      this.isEventAvailable = isAvailable;
    })
  }

  protected event: Event | undefined;
  protected eventDate: Date | undefined;
  protected isEventAvailable: Boolean = false;

  constructor(
    private eventService: EventsService,
    private dialog: MatDialog,
    private orderService: OrderService,
    protected sanitizer: DomSanitizer
  ) { }

  protected openOrderDialog(): void {
    const dialogRef = this.dialog.open(OrderDialog, {
      data: { price: this.event?.price },
    });

    dialogRef.afterClosed().subscribe((personalInformation) => {
      if (!personalInformation) {
        return;
      }
      
      if (this.event) {
        const orderData: OrderData = {
          customer_name: personalInformation.name,
          address: personalInformation.address,
          item: this.event,
          mail: personalInformation.email,
        };
        this.orderService.executeOrder(orderData).subscribe();
      }
    });
  }

}
