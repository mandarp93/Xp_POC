import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { ProductDetails } from '../shared/product-details.model';
import { CartApiService } from '../services/cart-api.service';
import { AccountApiService } from '../services/account-api.service';
import { ProductApiService } from '../services/product-api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  name: string;
  products;
  productlist: any[];
  singleProduct: any;
  alerts: any;
  user:any;
  constructor(private pservice: ProductApiService,
    private cservice: CartApiService, private router: Router,
    private prod: ProductDetails,
    private accservice: AccountApiService) { }

  displayProduct() {
    // console.log("In display method");
    this.user = localStorage.getItem('userlist');
    this.pservice.showProducts()
      .subscribe(
        posts => {
          this.productlist = posts;
          //console.log('FromService', posts);
        }
      );
  }
  onSearch(value: string){
    console.log(value);
  }

  onViewProduct(products) {
    // console.log("In View Product" + products);
    this.pservice.showProductById(products)
      .subscribe(
        posts => {
          this.singleProduct = posts;
          // console.log("Single Product");
          // console.log("hell",this.singleProduct.productName);
          this.router.navigate(["/productview", this.singleProduct.productId]);
        }
      )
  }

  CategorySelect(id){
    console.log("IN Category select method",id);
    debugger
    this.pservice.showProductsByCategory(id)
    .subscribe(
      response =>{
        this.products = response;
        console.log(this.products);
        this.router.navigate(['/category',id]);
      }
    );
  }

  ngOnInit() {
    this.displayProduct();
    console.log(this.name);
  }

}
