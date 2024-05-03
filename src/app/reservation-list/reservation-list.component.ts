import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Reservation } from '../shared/models/reservation';
import { ReservationService } from '../reservation/reservation.service';
import { AccountsService } from '../shared/accounts.service';
import { jwtDecode } from 'jwt-decode';
import { payloadListing } from '../features/store/checkout-actions';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit, OnDestroy {
  reservations: Reservation[] = [];
  isLoading: boolean = true; // Track loading state
  token = this.accountsService.getToken();

  constructor(
    private reservationService: ReservationService,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    if (this.token) {
      this.reservationService
        .getUserReservation(this.token)
        .subscribe((userReservations: Reservation[]) => {
          this.reservations = userReservations;
          this.isLoading = false;
        });
    }
  }

  ngOnDestroy(): void {}

  deleteReservation(
    id: number | undefined,
    data: { listingId: number; reason: string }
  ) {
    this.reservationService
      .deleteReservation(id, data.listingId, data.reason)
      .subscribe(() => {
        console.log('Delete request processed!', data.listingId, data.reason);

        if (this.token) {
          this.reservationService
            .getUserReservation(this.token)
            .subscribe((userReservations) => {
              this.reservations = userReservations;
            });
        }
      });
  }
}
