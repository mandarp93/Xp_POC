import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountApiService } from '../services/account-api.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private service: AccountApiService, private router: Router, private toastr: ToastrService) {
  }

  userDetails: any[];
  onRegister(formdata: NgForm) {
    console.log(formdata);
    if (formdata!.valid) {
      this.service.onRegisterDB(formdata.value)
        // .pipe(map((res: Response)=> res.json()))
        .subscribe(
          response => {
            //console.log(response)
            this.toastr.success("Registered Successfully");
          },
          error => {
            console.log(error)
          }
        );
        this.router.navigate(['/login']);
    }
    else
    this.toastr.error("Please enter the fields");
  }

  GetUser() {
    //console.log("In getUser");
    this.service.showData()
      .subscribe(
        posts => {
          this.userDetails = posts;
        }
      )
  }

  ngOnInit() {
  }
}
