import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {

  user;
  constructor(private toastr: ToastrService, private router: Router) { }
  LogOut(){
    console.log("In LogOut method");
    this.user = localStorage.getItem('userlist');
    if(this.user!=null)
    {
      this.user=localStorage.removeItem('userlist');
      //localStorage.clear();
    }
    this.toastr.success("Logged Out successfully");
    this.router.navigate(['/login']);
  }

  showUserCart(){
    this.user = localStorage.getItem('userlist');
    if(this.user!=null)
    {
      this.router.navigate(['cartdetails/:usercart']);
    }
  }

  OnClick(){
    alert("Order Placed successfully");
    location.reload();
  }

  ngOnInit() {
  }

}
