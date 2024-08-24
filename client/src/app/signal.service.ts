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
 

  addtocartProduct=signal({})


  editProduct=signal('')
  toEditProductId=signal(0)
  editSignal=signal(false)

 
  product=signal([])
 
  cartdetails=signal([])


  loginpage=signal(false)

}
