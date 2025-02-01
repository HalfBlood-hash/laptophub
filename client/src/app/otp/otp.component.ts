import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { SignalService } from '../signal.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  router =inject(Router)
  apicallServices=inject(ApiCallService)
  signalServices=inject(SignalService)
  public emailSignal=this.signalServices.registerEmail
  ngOnIt():void{
    console.log(this.emailSignal())
  }
  public otpStatus
  public otpStatusMessage
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
   onsubmit(){
    
    this.apicallServices.verifyEmail(this.otpform.value).subscribe(
      {
        next:(res)=>{
          if(res.success)
          {
           
            this.router.navigate(['login'])
          }
        
        },
        error:(err)=>{
          
            // console.log(err)
            this.otpStatus=true;
            this.otpStatusMessage=err.error.message
        }
      }
    )

      
    
   }
   rediect()
   {
      console.log(this.emailSignal())
      this.otpStatus=false;
      this.apicallServices.resendOtp(this.emailSignal()).subscribe({
        next:(res)=>{
          this.otpStatus=true;
          this.otpStatusMessage=res.message
        }
      })
   }
}
