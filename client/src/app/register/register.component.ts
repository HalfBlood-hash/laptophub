import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { SignalService } from '../signal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  router =inject(Router)
  apicallServices=inject(ApiCallService)
  signalService=inject(SignalService)
   loginerrormessage
   loginerrorrsatuts
 
 
   rediect()
   {
     this.router.navigate(['/login'])
   }
   
    registrationform=new FormGroup({
    username:new FormControl('',[Validators.minLength(4),Validators.required]),
    email:new FormControl('',[Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(4)]),
   
   })
  //  validation get method
  get username()
  {
    return this.registrationform.get("username")
  }
  get email()
  {
    return this.registrationform.get("email")
  }
  get password()
  {
    return this.registrationform.get("password")
  }
 
 
  onsubmit()
  {
    let user=this.registrationform.value
    user['cart']=[];
    user['name']='';
    user['address']='';
 
 
 
      this.apicallServices.createUser(this.registrationform.value).subscribe(
        {
          next:(res)=>{
            
            if(res.success)
            {
              this.signalService.registerEmail.set(this.registrationform.value.email)
              this.router.navigate(['otpverification'])
            }
          },
          error:(err)=>{
            this.loginerrorrsatuts=true
            this.loginerrormessage=err.error.message
            console.log(err.error.message)
          }
        }
      )
    }
}
