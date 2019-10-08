import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CartModel } from '../shared/cart-model.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  baseurl = 'https://localhost:5001/api/Cart';
  constructor(private http: HttpClient) { }

  AddToCartDB(product){
    console.log(product)
    return this.http.post(this.baseurl,product);
  }
  
  AddToCart(pd:any)
  {
    localStorage.setItem('productlist',JSON.stringify(pd));
  }

  getProductfromCart(){
    return JSON.parse(localStorage.getItem('productlist'));
  }
  removeproducts(){
    return localStorage.removeItem('productlist');
  }
  showCart(){
    console.log("In show product")
    return this.http.get (
      'https://localhost:5001/api/Cart'
    )
    .pipe(
      map(responseData => {
        const postsArray: any[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        //console.log("Service",postsArray);
        return postsArray;
      })
    );
  }

  onRemoveDB(cartid){
    return this.http.delete(this.baseurl + '/'+ cartid);
  }

  showCartByUser(details:any){
    console.log("In show product");
    return this.http.get (
      'https://localhost:5001/api/Cart/' + details)
      // .pipe(
      //   map(responseData => {
      //     const postsArray: CartModel[] = [];
      //     for (const key in responseData) {
      //       if (responseData.hasOwnProperty(key)) {
      //         postsArray.push({ ...responseData[key], id: key });
      //       }
      //     }
      //     console.log(postsArray);
      //     return postsArray;
      //   })
      // );
  }
}
