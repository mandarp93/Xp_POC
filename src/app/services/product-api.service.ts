import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  product = {
    productName: "",
    productId: ""
  }

  baseurl = 'https://localhost:5001/api/Product';

  constructor(private http: HttpClient) { }

  AddProductDB(pdb: any) {
    return this.http.post(this.baseurl,pdb);
  }

  showProductById(id) {
    return this.http.get('https://localhost:5001/api/Product/' + id)
    // .pipe(
    //   map(responseData => {
    //     const postsArray: any[] = [];
    //     for (const key in responseData) {
    //       if (responseData.hasOwnProperty(key)) {
    //         postsArray.push({ ...responseData[key], id: key });
    //       }
    //     }
    //     return postsArray;
    //   })
    // );
  }

  showProducts() {
    //console.log("In show product")
    return this.http
      .get(
        'https://localhost:5001/api/Product'
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

  showProductsByCategory(catId){
    console.log("In cat service");
    return this.http.get(this.baseurl + '/ProductByCategory/'+ catId);
  }
}
