import { Component, OnInit } from '@angular/core';
import { CartApiService } from 'src/app/services/cart-api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { OrderApiService } from 'src/app/services/order-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cartdetails: any;
  orderdetails:any;
  user: any;
  constructor(private cartservice: CartApiService, private router: Router, 
    private toastr: ToastrService,
    private oservice: OrderApiService) { }

  showUserCart() {
    console.log("In User Cart")
    this.user = localStorage.getItem('userlist')
    if (this.user != null) {
      this.cartservice.showCartByUser(this.user)
        .subscribe(
          details => {
            if (details != null) {
              // console.log(details)
              this.cartdetails = details;
              this.router.navigate(['/cartdetails', this.user]);
              if (this.cartdetails == null)
                this.toastr.error("No Item in Cart");
            }
          }
        )
    }
  }
  onLogOut() {
    console.log("In LogOut method");
    this.user = localStorage.getItem('userlist');
    if (this.user != null) {
      this.user = localStorage.removeItem('userlist');
      //localStorage.clear();
    }
    this.toastr.success("Logged Out successfully");
    this.router.navigate(['/login']);
  }

  showOrders() {
    this.user = localStorage.getItem('userlist');
    debugger
    console.log("In show order",this.user)
    this.oservice.getOrderbyUser(this.user)
    .subscribe(
      response=>{
        this.orderdetails = response;
        console.log(this.orderdetails)
      }
    );
    this.router.navigate(['/orders'])
  }

  ngOnInit() {

  }

}
