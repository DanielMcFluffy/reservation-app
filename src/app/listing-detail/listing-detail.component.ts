import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../landing/listings.service';
import { Listings } from '../shared/models/listings';
import { CheckoutService } from '../checkout/checkout.service';
import { MatDialog } from '@angular/material/dialog';
import { CalendarComponent } from '../features/calendar/calendar.component';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrl: './listing-detail.component.css',
})
export class ListingDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
    private checkoutService: CheckoutService,
    private dialog: MatDialog
  ) {}

  listing?: Listings;

  listingId!: string;

  facility_gym?: boolean;
  facility_kitchen?: boolean;
  facility_laundry?: boolean;
  facility_parking?: boolean;
  facility_pool?: boolean;
  facility_security?: boolean;

  openCalendarDialog() {
    this.dialog.open(CalendarComponent, {});
  }

  //track route params and pass it in getListing to initialize listing property to be used in view
  ngOnInit(): void {
    const routeParams = this.route.snapshot.params['id'];

    this.listingsService.getListing(routeParams).subscribe((listingData) => {
      const {
        facility_gym,
        facility_kitchen,
        facility_laundry,
        facility_parking,
        facility_pool,
        facility_security,
      } = listingData;

      this.listing = listingData;

      this.facility_gym = facility_gym;
      this.facility_kitchen = facility_kitchen;
      this.facility_laundry = facility_laundry;
      this.facility_parking = facility_parking;
      this.facility_pool = facility_pool;
      this.facility_security = facility_security;
    });
  }
}
