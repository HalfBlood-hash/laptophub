import { Component,OnInit,inject } from '@angular/core';
import { SignalService } from '../signal.service';
import { ApiCallService } from '../api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  signal=inject(SignalService)
  apicallservices=inject(ApiCallService)
  router=inject(Router)
  CartDetails:any=[]
  total;
  ngOnInit(): void {
   
    this.apicallservices.getcartProduct().subscribe({
      next:(res)=>{
        this.CartDetails=res.payload
        console.log('this is cart list ',this.CartDetails)
        this.total=this.calculateSubtotal()
      }
    })
  }
  deleteFromCart(id:any)
  {
    console.log('id of delete cart product',id)
    this.apicallservices.removefromCart(id).subscribe({
      next:(res)=>{
        console.log('cart ts remove from cart',res)
        this.total=this.calculateSubtotal()
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  calculateSubtotal(): any {
    console.log(
      'jhgfdsafghjkljhfdgsafghjkl;jhgfdsadfsghjkl',
      this.CartDetails.reduce((subtotal, item) => subtotal + item.price, 0)
    );
    let overall = this.CartDetails.reduce(
      (subtotal, item) => subtotal + item.price,
      0
    );
    return overall;
  }
  orders(CartDetails)
{
  this.router.navigate(['/bills'])
  this.signal.cartdetails.set(CartDetails)
}
}
