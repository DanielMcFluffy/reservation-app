import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { CheckoutService } from '../../checkout/checkout.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class CalendarComponent implements OnInit, OnDestroy {
  constructor(private checkoutService: CheckoutService) {}

  today: Date = new Date();
  tomorrow: Date = new Date();
  endDate: Date = new Date();
  bookingDate!: FormGroup;
  dateDifference?: number;
  bookingDays = new Subject<number>();
  subscription!: Subscription;

  ngOnInit(): void {
    this.tomorrow.setDate(this.today.getDate() + 1);
    this.endDate.setDate(this.tomorrow.getDate() + 4);

    this.bookingDate = new FormGroup({
      start: new FormControl(this.tomorrow),
      end: new FormControl(this.endDate),
    });

    this.subscription = this.bookingDate.valueChanges.subscribe((val) => {
      const startTimestamp = val.start?.getTime();
      const endTimestamp = val.end?.getTime();
      const differenceInMs = endTimestamp - startTimestamp;
      this.dateDifference = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
      // console.log(this.dateDifference)
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
