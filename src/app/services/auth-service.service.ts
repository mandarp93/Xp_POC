import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { CanActivate } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService{
  constructor() { }

  getisLoggedIn(){
    return localStorage.getItem('userlist');
  }
}
