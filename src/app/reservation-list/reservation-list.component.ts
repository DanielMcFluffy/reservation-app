import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit, OnDestroy {
  
  reservations: Reservation[] = [];
  isLoading: boolean = true; // Track loading state
  
  constructor(
    private reservationService: ReservationService,
    private accountsService: AccountsService,
  ){}

  ngOnInit(): void {
    //returns the observable, then subscribe to it
    //callback function is how we handle the data received
    // this.reservationService.getReservations().subscribe((reservations) => {
    //   this.reservations = reservations;
    //   console.log(reservations)
    //   console.log(this.accountsService.readToken())
    // });
    console.log(this.accountsService.readAuth())
    //get token 
    const token = this.accountsService.readToken();
    const username = this.accountsService.readEmail();
    this.reservationService.getUserReservation(token, username)
      .subscribe(
        (userReservations: Reservation[]) => {
          this.reservations = userReservations;
          this.isLoading = false;
        }
      )

  }

  ngOnDestroy(): void {
    
  }

  deleteReservation(id: number) {

    this.reservationService.deleteReservation(id).subscribe(() => {
      console.log('Delete request processed!');
      
    this.reservationService.getUserReservation(this.accountsService.readToken(), this.accountsService.readEmail())
      .subscribe(
        (userReservations) => {
          this.reservations = userReservations;
        }
      )
    }) ;
    
   
  }
}
