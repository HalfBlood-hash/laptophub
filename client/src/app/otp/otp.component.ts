import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { SignalService } from '../signal.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  router =inject(Router)
  apicallServices=inject(ApiCallService)
  toast=inject(NgToastService)
  signalServices=inject(SignalService)
  public isError:boolean
  public errorMessage:String




  otpform=new FormGroup({
    otp:new FormControl('',
      [Validators.minLength(6),
        Validators.required,
        Validators.pattern('^[0-9]*$')])
   
   })
   get otp()
   {
    return this.otpform.get("otp");
   }

  
   resetPasswordForm=new FormGroup({
     email:new FormControl('',[
       Validators.required,
       Validators.email
     ]
   )
   })
   changePasswordForm=new FormGroup({
    newpassword:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
   })
   get email()
   {
    return this.resetPasswordForm.get('email')
   }
   resetPasswordFunction()
   {
    
     
   }
   
   optformSubmit(){
    let formData = this.otpform.value;
      formData['email']=this.signalServices.registerEmail();
      console.log(formData)
      this.apicallServices.verifyEmail(formData).subscribe(
     {
      next:(res)=>{
        if(res.status)
        {
          this.router.navigate(['login'])
        }
        else{
          this.isError=true
          this.errorMessage=res.message
        }
      }
     }
      )
    
   }
   rediect()
   {
      
   }

// reset password



}
