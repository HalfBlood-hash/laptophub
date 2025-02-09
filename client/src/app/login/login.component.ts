import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignalService } from '../signal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from '../api-call.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  router =inject(Router)
 toast=inject(NgToastService)
  apicallServices=inject(ApiCallService)
  signal=inject(SignalService)
  loginerrormessage:any;
  loginerrorrsatuts:any
  radioValue:any;
 
  radioHandler(event:any)
  {
    this.radioValue=event.target.value
    this.signal.userloginType
  }
 
  Loginform=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })
 
  get username()
  {
    return this.Loginform.get('username')
   
  }
  get password()
  {
    return this.Loginform.get('password')
  }
  rediect()
  {
    this.router.navigate(['/register'])
   
  }
 onReset()
 {
  
  this.signal.resetPasswordStatus.set(true);
  console.log(this.signal.resetPasswordStatus());
  this.router.navigate(['/otpverification'])
 }
  onSubmit()
  {
    console.log(this.Loginform.value)
    if(this.radioValue==='seller')
    {
      this.apicallServices.adminLogin(this.Loginform.value).subscribe(
        {
          next:(res)=>{
            if(res['message']==='Login successful')
            {
              
              this.toast.success({
                              detail:'Login Success' ,
                              summary:'Successfull',
                              duration:3000,
                              position:'topCenter',
                            })
              console.log('Responese from seller if',res)
              // localStorage.setItem('token',res.token)
              // localStorage.setItem('name',res.user.username)
              // localStorage.setItem('userType', this.radioValue)
              this.signal.userloginType.set('seller')
              this.signal.loginUsername.set(res.user.username)
              this.signal.loginstatus.set(true)
              this.router.navigate(['home'])
            }
            else
            {
              console.log("else se message",res.message)
              this.loginerrormessage=res.message
              this.loginerrorrsatuts=true
 
             
            }
          },
        }
      )
    }
    else{
      console.log(this.Loginform.value)
      this.apicallServices.userLogin(this.Loginform.value).subscribe(
        {
          next:(res)=>{
            console.log(res.message, this.Loginform.value)
            if(res.success)
            {
             
              this.toast.success({
                detail:'Login Success' ,
                summary:'Successfull',
                duration:3000,
                position:'topCenter',
            })
              this.signal.userloginType.set('user')
              this.signal.loginUsername.set(res.user.username)
              this.signal.loginstatus.set(true)
              this.router.navigate(['home'])
              console.log("home ke niche")
            }
            else
            {
              console.log("usr ka else",res.message)
              this.loginerrormessage=res.message
              this.loginerrorrsatuts=true
            }
           
          },
          error:(err)=>{console.log(err)},
          complete()  { console.log('Observable emitted the complete notification'); }
        }
      )
    }
  }
}
