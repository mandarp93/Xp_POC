import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { count } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private currentcartcount = new BehaviorSubject(0);
  currentMessage = this.currentcartcount.asObservable();

  constructor() { }
  
  updateCartcount(count: number){
    this.currentcartcount.next(count);
  }
}
