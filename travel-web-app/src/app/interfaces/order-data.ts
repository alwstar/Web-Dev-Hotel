import { Event } from "./event";
import { RoomBooking } from "./room-booking";

export interface OrderData {
    customer_name: string,
    address: string,
    mail: string,
    item: Event | RoomBooking
}
