import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderApiService } from '../services/order-api.service';

@Component({
  selector: 'app-usesr-orders',
  templateUrl: './usesr-orders.component.html',
  styleUrls: ['./usesr-orders.component.css']
})
export class UsesrOrdersComponent implements OnInit {
  user: string;
  orderdetails: any;

  constructor(private router: Router, private oservice: OrderApiService,private Aroute: ActivatedRoute) { }

  showOrders() {
    this.user = localStorage.getItem('userlist');
    console.log("In show order")
    this.oservice.getOrderbyUser(this.user)
    .subscribe(
      response=>{
        this.orderdetails = response;
        console.log(this.orderdetails)
      }
    );
  }
  ngOnInit() {
    //this.orderdetails = this.Aroute.snapshot.params.orderdetails;
    this.showOrders();
  }

}
