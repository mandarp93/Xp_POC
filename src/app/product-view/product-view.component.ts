import { Component, OnInit } from '@angular/core';
import { ProductDetails } from '../shared/product-details.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginModel } from '../shared/login-model.model';
import { AccountApiService } from '../services/account-api.service';
import { CartModel } from '../shared/cart-model.model';
import { CartApiService } from '../services/cart-api.service';
import { ProductApiService } from '../services/product-api.service';
import { OrderApiService } from '../services/order-api.service';
import { SharedService } from '../services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  //Cartvariables:
  cart = {
    productId: 0,
    emailId: "",
    quantity: 0
  };
  QTY?: number;
  defaultQuantity: number = 1;
  productaddedToCart: ProductDetails[];
  alltotal: number;
  cartitemcount: number;
  buyerproductinfo =
    {
      productName: "",
      productId: 0,

    }
  //Other content variables
  products;
  user: any;
  name: string;
  productlist: any;
  singleProduct: any;
  count = 0;


  constructor(private pservice: ProductApiService,
    private cservice: CartApiService,
    product: ProductDetails,
    private router: Router,
    private Aroute: ActivatedRoute,
    private toastr: ToastrService,
    private sharedservice: SharedService) { }

  SingleView(name) {
    // console.log("In View Product");
    // console.log(name)
    this.pservice.showProductById(name)
      .subscribe(
        posts => {
          this.singleProduct = posts;
        }
      )
  }

  CartAdd(product: ProductDetails) {
    //console.log(products);
    this.user = localStorage.getItem('userlist');
    if (this.user == null) {
      this.toastr.info("Please LogIn first");
      this.router.navigate(["/login"]);
    }
    else {
      debugger
      this.productlist = this.cservice.getProductfromCart();
      if (this.productlist == null) {
        this.productlist = [];
        this.productlist.push(product);
        this.cservice.AddToCart(this.productlist);
        this.toastr.success("Product Added to Cart");
      }
      else {
        // debugger
        // let tempprod = this.productlist.find(pid => pid.productId == product.productId);
        // if (tempprod == null) {
        //   this.productlist = [];
        //   this.productlist.push(product);
        //   this.cservice.AddToCart(this.productlist);
        // }
        // // else {
        // //   this.toastr.info("Product is already present in Cart");
        // // }
        // else {
        if (this.QTY == undefined) {
          this.QTY = 1;
        }
        this.cart = {
          productId: product.productId,
          emailId: this.user,
          quantity: this.QTY
        }
        //console.log(this.cart)
        this.toastr.success("Product Added to Cart");
        this.cservice.AddToCartDB(this.cart)
          .subscribe(
            response => {
              //console.log(response)
              this.router.navigate(["/cartdetails", this.cart.emailId]);
            }
          );

      }
      this.cartitemcount = this.productlist.length
      this.sharedservice.updateCartcount(this.cartitemcount);
      //this.router.navigate(["/cartdetails",this.cart.emailId])
    }
  }

  BuyProduct(pro: ProductDetails) {
    this.user = localStorage.getItem('userlist');
    if (this.user == null) {
      this.router.navigate(["/login"]);
    }
    else {
      // debugger
      // this.cart = {
      //   productId: pid,
      //   emailId: this.user,
      //   quantity: this.QTY
      // }
      // if(this.cart.quantity==0){
      //   this.toastr.info("Plz add quantity");
      // }
      this.CartAdd(pro);
    }
  }

  // onAddQuantity(product:ProductDetails){
  //   this.productaddedToCart = this.cservice.getProductfromCart();
  //   this.productaddedToCart.find(p=> p.productId == product.productId).quantity = product.quantity+1;
  //   this.cservice.removeproducts();
  //   this.cservice.AddToCart((this.productaddedToCart))
  //   this.calculateAllTotal(this.productaddedToCart);
  // }

  // onRemoveQuantity(product: ProductDetails){

  //   this.productaddedToCart = this.cservice.getProductfromCart();
  //   this.productaddedToCart.find(p=> p.productId == product.productId).quantity = product.quantity - 1;
  //   this.cservice.removeproducts();
  //   this.cservice.AddToCart((this.productaddedToCart))
  //   this.calculateAllTotal(this.productaddedToCart);
  // }

  // calculateAllTotal(allitems: ProductDetails[]){
  //   let total = 0;
  //   for(let i in allitems)
  //   {
  //     total = total + (allitems[i].quantity * allitems[i].price);
  //   }
  //   this.alltotal = total;
  // }

  CategorySelect(id) {
    console.log("IN Category select method", id);
    debugger
    this.pservice.showProductsByCategory(id)
      .subscribe(
        response => {
          this.products = response;
          console.log(this.products);
          this.router.navigate(['/category', id]);
        }
      );
  }
  ngOnInit() {
    this.name = this.Aroute.snapshot.params.name;
    this.SingleView(this.name)
    this.productaddedToCart = this.cservice.getProductfromCart();
    for (let i in this.productlist) {
      this.productlist[i].Quantity = 1;
    }
    this.cservice.removeproducts();
    this.cservice.AddToCart(this.productaddedToCart);
    //this.calculateAllTotal(this.productaddedToCart);
  }


}
