import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductApiService } from '../services/product-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productlist: any[];
  user;
  role;
  constructor(private pservice: ProductApiService, private router: Router,
    private toastr: ToastrService) { }

  AddProduct(pd: NgForm) {
    this.role = localStorage.getItem('roles');
    if(this.role == 1)
    //console.log("In AddProduct Method");
    pd.value.image = pd.value.image.replace("C:\\fakepath\\", "");
    this.pservice.AddProductDB(pd.value)
      .subscribe(
        response => {
          console.log(response);
        },
        errorData => {
          console.log(errorData);
        }
      );
    alert("Product Added successfully");
    this.ngOnInit();
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

  GetProducts() {
    //console.log("In show Products");
    this.pservice.showProducts()
      .subscribe(
        posts => {
          this.productlist = posts;
          //console.log(posts);
        }
      );
    this.router.navigate(['/productdetails']);
  }
  // onAdd(){
  //   this.router.navigate(['/productdetails']);
  // }
  ngOnInit() {
    this.role = localStorage.getItem('roles');
  }
}
