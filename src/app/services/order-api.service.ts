import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderApiService {
 baseurl = 'https://localhost:5001/api/OrderApi';
 
  constructor(private http: HttpClient) { }

  AddOrder(ordermodel) {
    //console.log("Service worked",this.baseurl);
    return this.http.post(this.baseurl,ordermodel);
  }

  getOrderbyUser(user){
    debugger
    return this.http.get(this.baseurl + '/GetOrder/' + user);
  }
}
