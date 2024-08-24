import { Component, OnInit, inject } from '@angular/core';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
  CartDetails
  cart
  userDetails
  apicall=inject(ApiCallService)

  ngOnInit(): void {
 
    this.apicall.getOrders().subscribe({
      next:(res)=>{
        console.log(res)
        this.cart=res['payload']
        this.userDetails=res['user']
        this.CartDetails=res['payload']
        console.log("cart details",this.CartDetails)
      },
      error:(err)=>{}
    })
  }
 
  ordersSent(id)
  {
    console.log(id)
    this.apicall.ordersent(id).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
