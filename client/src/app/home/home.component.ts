import { Component, OnInit, inject } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Router } from '@angular/router';
import { SignalService } from '../signal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
 
 apicallservices=inject(ApiCallService)
 searchText:any
 productdata:any[]=[]
  ngOnInit(): void {
    this.apicallservices.getProduct().subscribe({
      next:(res)=>{
        console.log(res)
        this.productdata=res.payload
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.apicallservices.searchSubject.subscribe((searchString:any)=>{
      this.searchText=searchString
    })
  }

  router=inject(Router)
  signal=inject(SignalService)
  loginStatus=this.signal.loginstatus()
  userloginType=this.signal.userloginType()

  onClick(id:number)
  {
    console.log(id)
    this.router.navigate(['product',id])
  }
  noLogin()
  {
    this.router.navigate(['login'])
  }

  addtocart(id:any)
  {
    this.apicallservices.addtocart(id).subscribe({
      next:(res)=>{
        
        console.log('this cart item',res)
      }
    })
  }
  updateProduct(product:any)
  {
    this.signal.editSignal.set(true)
    this.signal.editProduct.set(product)
    this.signal.toEditProductId.set(product._id)
    this.router.navigate(['/addproduct'])
  }
  deleteProduct(id:any)
  {
    this.apicallservices.deleteProduct(id).subscribe({
      next:(res)=>{
        console.log('delete product',res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  
}
