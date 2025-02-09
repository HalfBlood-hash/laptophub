import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { SignalService } from '../signal.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-formcomponent',
  templateUrl: './formcomponent.component.html',
  styleUrl: './formcomponent.component.css'
})
export class FormcomponentComponent {

  // injection
  apiService=inject(ApiCallService);
  signalService=inject(SignalService);
  router=inject(Router);
  toast=inject(NgToastService)

  // varliable declaration
    isError:boolean=false
    isErrorMessage:string=''

    
    // registerFormStatus:boolean=false;

     registrationform=new FormGroup({
      username:new FormControl('',[
        Validators.minLength(4),Validators.required
      ]),
      email:new FormControl('',
        [Validators.email,Validators.required]),
      password:new FormControl('',
        [Validators.required,Validators.minLength(5)])
    })
   
    

    // getter and setter
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
   

    registerFormSubmit()
    {
      let userdata=this.registrationform.value
      userdata['cart']=[];
      userdata['name']='';
      userdata['address']='';
      this.apiService.createUser(userdata).subscribe({
        next:(res)=>{
          this.signalService.registerEmail.set(this.registrationform.value.email)
          console.log(this.email)
          this.signalService.isError.set(false);
          this.signalService.isErrorMessage.set('')
          this.signalService.registerEmail.set(this.registrationform.value.email)
          this.signalService.verifyEmailStatus.set(true);
          
        },
        error:(err)=>{
          this.signalService.isError.set(true);
          this.signalService.isErrorMessage.set(err.error.message)
        }
      })
      console.log(this.registrationform.value)
    }

    redirectFromRegister()
    {
      console.log("redirect")
      this.signalService.loginFormStatus.set(true); 
    }
  // ***********************email verify**********************
  emailVerifyForm=new FormGroup({
    otp:new FormControl('',[Validators.required])
  })
  emailVerfySubmit()
  {
    console.log(this.emailVerifyForm.value);
    console.log("emailverify");
    this.apiService.verifyEmail(this.emailVerifyForm.value).subscribe({
      next:(res)=>{
        this.signalService.isError.set(false);
        this.signalService.isErrorMessage.set('')
        this.signalService.loginFormStatus.set(true);
      },
      error:(err)=>{
        this.signalService.isError.set(true);
        this.signalService.isErrorMessage.set(err.error.message)
      }
    })
  }
  resendOpt()
  {
    this.apiService.sendOtp(this.signalService.registerEmail()).subscribe({
      next:(res)=>{
          console.log("new opt is sent")
      },
      error:(err)=>{
        this.signalService.isError.set(true);
        this.signalService.isErrorMessage.set(err.error.message)
      }
    })
  }

// *************************OPT FORM*****************************
  otpForm=new FormGroup({
    otp:new FormControl('',[Validators.required])
  })

 optFormSubmit()
 {
  console.log("otp form")
  let data=this.otpForm.value;
  data['email']=this.signalService.registerEmail();
  this.apiService.verifyEmail(data).subscribe({
    next:(res)=>{
      // new password form khulega
      console.log(res)
      this.signalService.newPassformStatus.set(true);
      this.signalService.otpFormstatus.set(false)
      this.signalService.verifyEmailStatus.set(false)
      this.signalService.forgetPasswordFormStatus.set(false)
      // 
    },
    error:(err)=>{
        this.signalService.isError.set(true);
        this.signalService.isErrorMessage.set(err.error.message)
    }
  })
 }
// *************************Login**********************************
    loginform=new FormGroup({
      email:new FormControl('',
        [Validators.email,Validators.required]),
      password:new FormControl('',
        [Validators.required,Validators.minLength(5)])
    })
  
    get loginEmail()
    {
      return this.loginform.get("email")
    }
    get loginPassword()
    {
      return this.loginform.get("password")
    }

    loginFormSubmit()
    {
      console.log(this.loginform.value);
      this.apiService.userLogin(this.loginform.value).subscribe({
        next:(res)=>{
          console.log("SATYdfhgfhfghdfgh",res)
          this.toast.success({
            detail:'Login Success',
            summary:'Successfull',
            duration:3000,
            position:'topCenter',
        })
          this.signalService.userloginType.set('user')
              this.signalService.loginUsername.set(res.payload.username)
              this.signalService.loginstatus.set(true)
              this.router.navigate(['home'])
        
        },
        error:(err)=>{
          console.log()
          console.log(err)
          console.log(err)
          this.signalService.isError.set(true);
          this.signalService.isErrorMessage.set(err.error.message)
        }
      })
    }
    redirectLogin()
    {
      console.log("login redirect")
      this.signalService.loginFormStatus.set(false)
    }
    forgetPassword()
    {
      console.log("forget password")
      this.signalService.isError.set(false)
      // this.signalService.isErrorMessage.set('')
      this.signalService.loginFormStatus.set(false);
      this.signalService.forgetPasswordFormStatus.set(true);
      console.log(this.signalService.forgetPasswordFormStatus())
    }
    // ***************************forget password***************************
    forgetPasswordForm=new FormGroup({
      email:new FormControl('',[Validators.email])
    })
    forgetPasswordSubmit()
    {
      console.log("fps",this.forgetPasswordForm.value);
      this.apiService.sendOtp(this.forgetPasswordForm.value.email).subscribe({
        next:(res)=>{
          console.log(res)
          this.signalService.registerEmail.set(this.forgetPasswordForm.value.email);
          this.signalService.otpFormstatus.set(true);
        },
        error:(err)=>{
          this.signalService.isError.set(true);
          this.signalService.isErrorMessage.set(err.error.message)
        }
      })
    }
    // *****************new password form**********************newPasswordForm
    newPasswordForm=new FormGroup({
      newpassword:new FormControl('',[Validators.required,Validators.minLength(5)]),
      confirmPassword:new FormControl('',Validators.required)
    })
   get newpassword()
    {
      return this.newPasswordForm.get('newpassword')
    }
    newPasswrdSubmit()
    {
      let p1=this.newPasswordForm.value.confirmPassword;
      let p2=this.newPasswordForm.value.newpassword;
      if(p1===p2)
      {
        let data=this.newPasswordForm.value;
        data['email']=this.signalService.registerEmail();
        this.apiService.resetPassword(data).subscribe({
          next:(res)=>{
            this.signalService.loginFormStatus.set(true);
            this.signalService.registerEmail.set('');

          },error:(err)=>{
            this.signalService.isError.set(true);
          this.signalService.isErrorMessage.set(err.error.message)
          }
        })

      }

    }
}
