import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from '../api-call.service';
import { Router } from '@angular/router';
import { SignalService } from '../signal.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {

  apicallServices=inject(ApiCallService)
 
  router=inject(Router)
  signal=inject(SignalService)
  
  toEditproductDetail:any
 
  editsatus=this.signal.editSignal()
 
  productId=this.signal.toEditProductId
   
  ngOnInit(): void {
    console.log("editsatus",this.editsatus)
   
    let currentEditProduct=this.signal.editProduct()
    
    console.log('current product',currentEditProduct)
    if(this.editsatus)
    {
   
     
            this.addProductForm.patchValue({
             
              pid:currentEditProduct['pid'],
              display:currentEditProduct['display'],
              name:currentEditProduct['name'],
              price:currentEditProduct['price'],
              image:currentEditProduct['image'],
              ram:currentEditProduct['ram'],
              rom:currentEditProduct['rom'],
              processor:currentEditProduct['procecessor'],
              color:currentEditProduct['color'],
              des1:currentEditProduct['des1'],
              des2:currentEditProduct['des2'],
              des3:currentEditProduct['des3'],
              des4:currentEditProduct['des4'],
              des5:currentEditProduct['des5'],
             
             
             
           
            })
           
 
       
           
       
     
    }
   
    }
    addProductForm=new FormGroup({
      pid:new FormControl('',[Validators.required]),
      name:new FormControl('',[Validators.required]),
      display:new FormControl('',[Validators.required]),
      price:new FormControl('',[Validators.required]),
      image:new FormControl('',[Validators.required]),
      ram:new FormControl('',[Validators.required]),
      rom:new FormControl('',[Validators.required]),
      processor:new FormControl('',[Validators.required]),
      color:new FormControl('',[Validators.required]),
      des1:new FormControl('',[Validators.required]),
      des2:new FormControl('',[Validators.required]),
      des3:new FormControl('',[Validators.required]),
      des4:new FormControl('',[Validators.required]),
      des5:new FormControl('',[Validators.required]),
    })
    onSubmit()
    {
      console.log("editstatus!:",this.editsatus)
      if(this.editsatus)
      {
        let id=this.signal.toEditProductId()
        console.log("edit")
        console.log('formdata',this.addProductForm.value)
        console.log('id',id)
        this.apicallServices.updateProduct(id,this.addProductForm.value).subscribe({
          next:(res)=>{
            console.log(res,"upadate")
            this.router.navigate(['/home'])
          },
          error:(err)=>{
            console.log(err)
          }
        })
      }
      else{
        console.log("addd")
     
      console.log('this is else of onsubmit',this.addProductForm.value)
      this.apicallServices.addproduct(this.addProductForm.value).subscribe({
        next:(res)=>{
          console.log('this is from addprdit res',res)
          this.router.navigate(['/home'])
        },
        error:(err)=>{
          console.log(err)
        }
      })
      }
  }
 
}
