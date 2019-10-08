import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponentComponent } from './cart-component/cart-component.component';
import { DashboardComponent } from './CustomerDashboard/dashboard/dashboard.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from './auth.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UsesrOrdersComponent } from './usesr-orders/usesr-orders.component';


const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'contactus', component: ContactUsComponent},
  { path : 'welcome', component: WelcomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutUsComponent },
  { path: 'category/:catid', component: CategoryComponent },
  { path: 'productdetails', component: ProductDetailsComponent },
  { path:'cartdetails/:usercart', component: CartComponentComponent, canActivate: [AuthGuard]},
  { path:'custdash', component: DashboardComponent, canActivate: [AuthGuard]},
  { path:'productview/:name', component: ProductViewComponent},
  { path:'orderdetails', component: OrdersComponent, canActivate: [AuthGuard]},
  { path:'buynow', component: BuyNowComponent, canActivate: [AuthGuard]},
  { path:'orders', component: UsesrOrdersComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
