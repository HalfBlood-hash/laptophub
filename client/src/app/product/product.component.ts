import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { SignalService } from '../signal.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  route=inject(ActivatedRoute)
  router=inject(Router)
  signal=inject(SignalService)
  apiservices=inject(ApiCallService)
  clickedProduct:any=[]
  loginstatus=this.signal.loginstatus
  userloginType=this.signal.userloginType
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id')
    this.apiservices.getProduct().subscribe({
      next:(res)=>{
        for(let p of res.payload)
        {
          if(p._id===id)
          {
            this.clickedProduct=p
            console.log("clicked PRoduct",this.clickedProduct)
          }
        }
        console.log(res.payload)

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  editProduct(x)
  {

  }

  addToCart(id)
  {
    this.apiservices.addtocart(id).subscribe({
      next:(res)=>{
        
        console.log('this cart item',res)
      }
    })
  }
  nologin()
  {
    this.router.navigate(['/login'])
  }
}
