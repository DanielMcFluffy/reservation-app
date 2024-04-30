import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() { }

  private totalDaysPrice = signal(0);
  private cleaningFee = signal(60);
  
  public readTotalDaysPrice = this.totalDaysPrice.asReadonly();
  public readCleaningFee = this.cleaningFee.asReadonly();
  public subtotal = computed(() => {
  return  this.totalDaysPrice() + this.cleaningFee()
})


  setTotalDaysPrice(days: number, rate: number) {
     this.totalDaysPrice.set(days * rate);
  }

}
