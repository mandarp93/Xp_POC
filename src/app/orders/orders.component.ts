import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderApiService } from '../services/order-api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ordermodel: {
    Email: "",
    City: "",
    State: "",
    PinCode: 0,
    Landmark: "",
  }
  user;
  constructor(private oservice: OrderApiService, private router: Router, private toastr: ToastrService) { }

  onAdd(data:NgForm){
    this.user = localStorage.getItem('userlist');
    this.ordermodel = {
      Email: this.user,
      City: data.value.city,
      State: data.value.state,
      PinCode: data.value.pincode,
      Landmark: data.value.landmark
    }
    this.oservice.AddOrder(this.ordermodel)
    .subscribe(
      response=>{
        console.log(response);
      }
    );
    this.router.navigate(['/buynow']);
    this.toastr.success("Your Address has been saved");
  }
  ngOnInit() {
    this.user = localStorage.getItem('userlist');
  }

}
