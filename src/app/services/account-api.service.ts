import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../shared/login-model.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {
  baseurl = 'https://localhost:5001/api/Customers';
  constructor(private http: HttpClient) { }

  onRegisterDB(nf: any) {
    //console.log("In RegisterDB")
    return this.http.post(this.baseurl, nf)
  }

  loginDB(logindata: LoginModel) {
    //  add the content type
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    //console.log(logindata);
    return this.http.post(this.baseurl + '/Login',logindata, { headers: header });
  }

  showData() {
    return this.http
      .get(
        'https://localhost:5001/api/Customers'
      )
      .pipe(
        map(responseData => {
          const postsArray: any[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }
  showUserById(name){
    //console.log(name)
    return this.http
    .get('https://localhost:5001/api/Customers'+ '/GetByName/' + name)
  }
}
