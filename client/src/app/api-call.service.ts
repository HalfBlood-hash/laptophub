import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SignalService } from './signal.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor() { }
  signal=inject(SignalService)
  httpClient=inject(HttpClient)
 
  createUser(user:any):Observable<any>
  {
    return this.httpClient.post('http://localhost:4000/user-api/registeruser',user)
  }

  userLogin(user:any):Observable<any>
  {
    return this.httpClient.post('http://localhost:4000/user-api/login',user)
  }

  adminLogin(user:any):Observable<any>
  {
    return this.httpClient.post('http://localhost:4000/seller-api/login',user)
  }

  addtocart(id:any):Observable<any>
  {
    return this.httpClient.post(`http://localhost:4000/user-api/addtocart/${this.signal.loginUsername()}`,{abc:id})
    // return this.httpClient.post(`http://localhost:4000/user-api/addtocart/satyam`,{abc:id})
  }
  getcartProduct():Observable<any>
  {
    return this.httpClient.get(`http://localhost:4000/user-api/cartview/${this.signal.loginUsername()}`)
  }
  // ye wale se bana hai
  removefromCart(id:any):Observable<any>
  {
    console.log(this.signal.loginUsername(),id)
    return this.httpClient.post(`http://localhost:4000/user-api/deletecart/${this.signal.loginUsername()}`,{abc:id})
  }
  getProduct():Observable<any>
  {
    return this.httpClient.get('http://localhost:4000/product-api/getproduct')
  }
  addproduct(data:any)
  {
    return this.httpClient.post(`http://localhost:4000/product-api/addproduct`,data)
  }
  updateProduct(id:any,data)
  {
    
    return this.httpClient.put(`http://localhost:4000/product-api/updateproduct/${id}`,data)
  }
  deleteProduct(id:any)
  {
    return this.httpClient.delete(`http://localhost:4000/product-api/deleteproduct/${id}`)
  }


  sendOrders(OrdersData): Observable<any> {
    console.log('this is orderdata from send order function',OrdersData)
    return this.httpClient.post(`http://localhost:4000/order-api/orders`,OrdersData);
  }
  ordersent(id): Observable<any> {
    console.log('this is orderdata from send order function',id)
    return this.httpClient.delete(`http://localhost:4000/order-api/orders/${id}`);
  }

  getOrders()
  {
    return this.httpClient.get('http://localhost:4000/order-api/orders')
  }


  searchText:any=''
  searchSubject=new Subject()
  getSearchString(searchText: any) {
    this.searchText = searchText;
    this.searchSubject.next(this.searchText);
  }
}
