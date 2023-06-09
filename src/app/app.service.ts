import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const api = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  items: any;
  constructor(private http: HttpClient) {
    let listCart: any = localStorage.getItem('cart');
    this.items = listCart ? JSON.parse(listCart) : [];
  }

  addOrders(data: any) {
    return this.http.post(`${api}/new-orders`, data);
  }

  postCheckout(data: any) {
    return this.http.post(`${api}/new-orders`, data);
  }

}
