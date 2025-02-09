import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SignalService } from './signal.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private url = 'http://localhost:4000';
  private signal = inject(SignalService);
  private httpClient = inject(HttpClient);

  constructor() {}

  createUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.url}/user-api/registeruser`, user);
  }

  verifyEmail(code: any): Observable<any> {
    return this.httpClient.post(`${this.url}/user-api/verifyemail`, code);
  }
  sendOtp(email:any):Observable<any>{
    console.log(email)
    return this.httpClient.post(`${this.url}/user-api/sendotp`,{email:email})
  }
  resetPassword(data:any):Observable<any>{
    return this.httpClient.post(`${this.url}/user-api/resetpassword`,data);
  }
  userLogin(user: any): Observable<any> {
    return this.httpClient.post(`${this.url}/user-api/login`, user);
  }

  adminLogin(user: any): Observable<any> {
    return this.httpClient.post(`${this.url}/seller-api/login`, user);
  }

  addtocart(id: any): Observable<any> {
    return this.httpClient.post(`${this.url}/user-api/addtocart/${this.signal.loginUsername()}`, { abc: id });
  }

  getcartProduct(): Observable<any> {
    return this.httpClient.get(`${this.url}/user-api/cartview/${this.signal.loginUsername()}`);
  }

  removefromCart(id: any): Observable<any> {
    console.log(this.signal.loginUsername(), id);
    return this.httpClient.post(`${this.url}/user-api/deletecart/${this.signal.loginUsername()}`, { abc: id });
  }

  getProduct(): Observable<any> {
    return this.httpClient.get(`${this.url}/product-api/getproduct`);
  }

  addproduct(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/product-api/addproduct`, data);
  }

  updateProduct(id: any, data: any): Observable<any> {
    return this.httpClient.put(`${this.url}/product-api/updateproduct/${id}`, data);
  }

  deleteProduct(id: any): Observable<any> {
    return this.httpClient.delete(`${this.url}/product-api/deleteproduct/${id}`);
  }

  sendOrders(OrdersData: any): Observable<any> {
    console.log('this is order data from send order function', OrdersData);
    return this.httpClient.post(`${this.url}/order-api/orders`, OrdersData);
  }

  ordersent(id: any): Observable<any> {
    console.log('this is order data from send order function', id);
    return this.httpClient.delete(`${this.url}/order-api/orders/${id}`);
  }

  getOrders(): Observable<any> {
    return this.httpClient.get(`${this.url}/order-api/orders`);
  }

  searchText: any = '';
  searchSubject = new Subject();

  getSearchString(searchText: any) {
    this.searchText = searchText;
    this.searchSubject.next(this.searchText);
  }
}
