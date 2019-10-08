import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../shared/login-model.model';
import { AccountApiService } from '../services/account-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  Userslist: any[];
  users: any[];
  body;
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(private service: AccountApiService, private router: Router, private toastr: ToastrService) { }

  onlogin(lf: NgForm) {
    if (lf.value.emailId.length === 0) {
      this.toastr.error("Please enter email");
    } else if (lf.value.password.length === 0) {
      this.toastr.error("Please enter password");
    } else {
      this.service.loginDB(lf.value)
        .subscribe(
          (res?: any) => {
            this.body = res;
            if (this.body.status === 'Invalid user' || this.body === undefined) {
              //if(res.emailId==lf.value.emailId)
              //localStorage.setItem("loginStatus",JSON.stringify(1));
              this.toastr.error("Invalid email or password");
              this.router.navigate(["/login"]);
              lf.reset();
            }
            else {
              //sessionStorage.setItem('userlist',this.body.emailId);
              localStorage.setItem('userlist', this.body.emailId)
              localStorage.setItem('roles',this.body.roleId);
              if (this.body.roleId == 2) {
                this.toastr.success("User Logged in suucessfully");
                this.router.navigate(["/custdash"]);
              }
              else{
                this.toastr.success("Welcome Admin");
                this.router.navigate(['/product']);
              }
            }
            err => {
              console.error(err);
            }
          });
    }
  }

  ngOnInit() {

  }

}
