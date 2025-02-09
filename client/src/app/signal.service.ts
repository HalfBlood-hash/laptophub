import { Injectable ,signal} from '@angular/core';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  constructor() { }

  loginstatus=signal(false)
  userloginType=signal('')
  loginUsername=signal('')
  
  registerEmail=signal('')

 

  addtocartProduct=signal({})
  resetPasswordEmail=signal('')
  resetPasswordStatus=signal(false)

  editProduct=signal('')
  toEditProductId=signal(0)
  editSignal=signal(false)

 
  product=signal([])
 
  cartdetails=signal([])


  loginpage=signal(false)


  // **********Form thinng
  isError=signal(false);
  isErrorMessage=signal('')
  public registerFormStatus=signal(false)
  public loginFormStatus=signal(true);
  public verifyEmailStatus=signal(false);
  public otpFormstatus=signal(false);
  public forgetPasswordFormStatus=signal(false);
  public newPassformStatus=signal(false)

}
