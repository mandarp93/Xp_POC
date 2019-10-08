import { Component, OnInit } from '@angular/core';
import { CartApiService } from '../services/cart-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApiService } from '../services/product-api.service';
import { CartModel } from '../shared/cart-model.model';
import { ToastrService } from 'ngx-toastr';
import { OrderApiService } from '../services/order-api.service';
import { OrderModel } from '../shared/order-model.model';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.css']
})
export class CartComponentComponent implements OnInit {
  username;
  totalAmount: number;
  orderTotal: number;
  usercart: any;
  products;
  cartdetails: CartModel[];
  singleusercart;
  orderofuser: OrderModel[];
  uorders;
  constructor(private cservice: CartApiService, private router: Router,
    private Aroute: ActivatedRoute, private oservice: OrderApiService,
    private toastr: ToastrService, private pservice: ProductApiService) { }

  UserCart(usercart) {
    this.cservice.showCartByUser(usercart)
      .subscribe(
        (response: CartModel[]) => {
          this.cartdetails = response;
          this.username = usercart;
          //console.log(this.cartdetails);
          var totalAmount = this.cartdetails.map(item => item.totalPrice);
          //console.log(totalAmount);
          let Total = 0;
          for (let t in totalAmount) {
            Total = Total + totalAmount[t];
          }
          this.orderTotal = Total;
          //console.log(this.orderTotal)
        }
      )
  }

  onRemove(cartid) {
    //console.log("To remove cart");
    debugger
    this.username = localStorage.getItem('userlist');
    this.cservice.onRemoveDB(cartid)
      .subscribe(
        response => {
          this.singleusercart = response;
          localStorage.removeItem('productlist');
        }
      );
    if (this.cartdetails == null)
      this.toastr.info("No Items in Cart");
    location.reload();
  }

  OrderProcess() {
    this.username = localStorage.getItem('userlist');
    if (this.username != null && this.cartdetails != null) {
      this.router.navigate(['/orderdetails']);
    }
    else {
      this.toastr.info("Please add some product to your cart");
    }
  }

  CategorySelect(id) {
    console.log("IN Category select method", id);
    this.pservice.showProductsByCategory(id)
      .subscribe(
        response => {
          this.products = response;
          console.log(this.products);
          this.router.navigate(['/category', id]);
        }
      );
  }

  onLogOut() {
    this.username = localStorage.getItem('userlist');
    if (this.username) {
      localStorage.removeItem('userlist');
      //localStorage.removeItem('productlist');
    }
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.usercart = this.Aroute.snapshot.params.usercart;
    this.UserCart(this.usercart)
  }
}
