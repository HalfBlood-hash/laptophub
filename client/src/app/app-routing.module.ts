import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { BillsComponent } from './bills/bills.component';
import { OtpComponent } from './otp/otp.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { FormcomponentComponent } from './formcomponent/formcomponent.component';

const routes: Routes = [

  {path:'home',component:HomeComponent},
  {path:'cart',component:CartComponent},
  {path:'addproduct',component:AddproductComponent},
  {path:'orders',component:OrderComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'bills',component:BillsComponent},
  {path:'otpverification',component:OtpComponent},
  {path:'form',component:FormcomponentComponent},
  {path:'changepassword',component:ChangepasswordComponent},
  {path:'product/:id',component:ProductComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
