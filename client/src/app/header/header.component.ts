import { Component ,OnInit,inject} from '@angular/core';
import { SignalService } from '../signal.service';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  
  signal=inject(SignalService)
  apicall=inject(ApiCallService)
  searchText:any=''
  router=inject(Router)
  loginStatus:any
  loginUserType:any
  loginUsername:any
  // loginstatus=this.signal.loginstatus
  ngOnInit(): void {
    this.loginStatus=this.signal.loginstatus
    console.log(this.loginStatus())
    this.loginUserType=this.signal.userloginType
    console.log(this.loginUserType())
    this.loginUsername=this.signal.loginUsername
    console.log(this.loginUsername())
  }
  addproduct()
  {
    this.signal.editSignal.set(false)
  }
  onLogOut()
  {
    this.signal.loginstatus.set(false)
    this.signal.loginUsername.set('')
    this.signal.userloginType.set('')
    this.router.navigate(['login'])
  }

  searchProduct(searchText:any)
  {
    this.apicall.getSearchString(searchText)
  }

}
