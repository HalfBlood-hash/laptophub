import { Component, inject } from '@angular/core';
import { SignalService } from '../signal.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCallService } from '../api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {
  
  signal=inject(SignalService)
  router=inject(Router)
  apicall=inject(ApiCallService)
  cartdetils=this.signal.cartdetails()
  billform=new FormGroup({
    uname:new FormControl(''),
    mobno:new FormControl(''),
    address:new FormControl('')
  })
  alldetails=[]
  onsubmit()
  {
    console.log(this.billform.value)
    console.log(this.cartdetils)
    for(let i=0;i<this.cartdetils.length;i++)
      {
        this.alldetails=this.cartdetils[i]
        this.alldetails['uname']=this.billform.value.uname
        this.alldetails['address']=this.billform.value.address
        this.alldetails['mobno']=this.billform.value.mobno
        console.log('this is all details',this.alldetails)
        this.apicall.sendOrders(this.alldetails).subscribe({
          next:(res)=>{
            console.log('this is bill ts ',res.payload)
          },
          error:(err)=>{
            console.log('err from the err',err)
          }
        })
        this.router.navigate(['/home'])
      }

  }
  deleteFromCart()
  {
    console.log('this is delete from bill ts',this.cartdetils['_id'])
    let id=this.cartdetils['_id']
    this.apicall.removefromCart(id).subscribe({
      next:(res)=>{

        console.log('bill ts remove form cart ',res)
        
      },error:(err)=>{
        console.log('err from bills ts',err)
      }

    })
  }
}
