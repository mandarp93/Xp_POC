import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetails } from './shared/product-details.model';
import { DashboardComponent } from './CustomerDashboard/dashboard/dashboard.component';
import { CartComponentComponent } from './cart-component/cart-component.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { AccountApiService } from './services/account-api.service';
import { CartApiService } from './services/cart-api.service';
import { ProductApiService } from './services/product-api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard} from './auth.guard';
import { AuthServiceService} from './services/auth-service.service';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ForgotPasswordComponent } from './CustomerDashboard/forgot-password/forgot-password.component';
import { UsesrOrdersComponent } from './usesr-orders/usesr-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    WelcomeComponent,
    AboutUsComponent,
    CategoryComponent,
    ProductDetailsComponent,
    DashboardComponent,
    CartComponentComponent,
    ProductViewComponent,
    BuyNowComponent,
    OrdersComponent,
    ContactUsComponent,
    ForgotPasswordComponent,
    UsesrOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:1200,
      positionClass:'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [ProductDetails,
    AccountApiService,
    CartApiService,
  ProductApiService,AuthGuard,AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
