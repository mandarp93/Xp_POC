import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  productlist: any;
  products;
  catid: any;
  singleProduct;
  constructor(private pservice: ProductApiService,
    private router: Router,
    private Aroute: ActivatedRoute, ) { }

  ProductsByCategory(catid) {
    this.pservice.showProductsByCategory(catid)
      .subscribe(
        response => {
          this.productlist = response;
          //console.log(this.productlist);
        }
      );
  }
  onViewProduct(products) {
    console.log("In View Product" + products);
    this.pservice.showProductById(products)
      .subscribe(
        posts => {
          this.singleProduct = posts;
          this.router.navigate(["/productview", this.singleProduct.productId])
        }
      )
  }


  ngOnInit() {
    this.catid = this.Aroute.snapshot.params.catid;
    this.ProductsByCategory(this.catid);
  }

}
