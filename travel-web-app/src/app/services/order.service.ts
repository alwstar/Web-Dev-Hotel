import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderData } from '../interfaces/order-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public executeOrder(orderData: OrderData): Observable<string> {
    return this.http.post<string>('http://localhost:3000/order', orderData);
  }
}
