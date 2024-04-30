import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Reservation } from '../shared/models/reservation';
import { ReservationService } from '../reservation/reservation.service';
import { AccountsService } from '../shared/accounts.service';
import { jwtDecode } from 'jwt-decode';

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
    //returns the observable, then subscribe to it
    //callback function is how we handle the data received
    // this.reservationService.getReservations().subscribe((reservations) => {
    //   this.reservations = reservations;
    //   console.log(reservations)
    //   console.log(this.accountsService.readToken())
    // });
    // console.log(this.accountsService.readAuth())
    //get token
    // const token = localStorage.getItem('accessToken');

    if (this.token) {
      // const username = jwtDecode<{username: string}>(this.token).username || jwtDecode<{email: string}>(this.token).email;
      this.reservationService
        .getUserReservation(this.token)
        .subscribe((userReservations: Reservation[]) => {
          // console.log(typeof this.token);
          this.reservations = userReservations;
          this.isLoading = false;
        });
    }
    // el {

    // }
  }

  ngOnDestroy(): void {}

  deleteReservation(id: number) {
    this.reservationService.deleteReservation(id).subscribe(() => {
      console.log('Delete request processed!');

      if (this.token) {
        const { username } = jwtDecode<{ username: string }>(this.token);

        this.reservationService
          .getUserReservation(this.token)
          .subscribe((userReservations) => {
            this.reservations = userReservations;
          });
      }
    });
  }
}
