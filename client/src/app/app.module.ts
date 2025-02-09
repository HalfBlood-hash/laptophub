import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { OrderComponent } from './order/order.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { BillsComponent } from './bills/bills.component';
import { SearchPipe } from './search.pipe';
import { NgToastModule } from 'ng-angular-popup';
import { OtpComponent } from './otp/otp.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { FormcomponentComponent } from './formcomponent/formcomponent.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
    LoginComponent,
    AddproductComponent,
    OrderComponent,
    RegisterComponent,
    ProductComponent,
    BillsComponent,
    SearchPipe,
    OtpComponent,
    ChangepasswordComponent,
    FormcomponentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,FormsModule,HttpClientModule,NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
