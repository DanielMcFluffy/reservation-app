import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  
  //reservationForm is an instance of FormGroup which we will use to bind to the [formGroup] property of the <form> tag
  reservationForm: FormGroup = new FormGroup({});
  today!: string;

  //access user's email if exists
    token = this.accountsService.getToken();
    userEmail!: string

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountsService: AccountsService,
    ) {
     
  }

  ngOnInit(): void {

    if (this.token) {
      const username = jwtDecode<{username: string}>(this.token).username || jwtDecode<{email: string}>(this.token).email;

      this.userEmail = username;
      // console.l
    }

    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];

    //form builder is used to group the formControlName associated in the input elements for the FormGroup
    this.reservationForm = this.formBuilder.group({
      checkindate: ['', Validators.required],
      checkoutdate: ['', Validators.required],
      guestname: ['', Validators.required],
      guestemail: [ {value: this.userEmail || '', disabled: this.userEmail !== null}, [Validators.required, Validators.email]],
      roomnumber: ['', Validators.required],
    })

    //check the current route url we're on and accessing the params (:id) to assign to id variable
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id) {
      this.reservationService.getReservation(id).subscribe((reservation) => {
        if(reservation){

          //converts ISO date from db to yyyy/mm/dd
          const checkInDate = new Date(reservation.checkindate).toISOString().split('T')[0];
          const checkOutDate = new Date(reservation.checkoutdate).toISOString().split('T')[0];

          this.reservationForm.patchValue({...reservation,
            checkindate: checkInDate,
            checkoutdate: checkOutDate
        });
        }
      })
    }
  }
  //use formBuilder to arrange the formControlName data we've defined in the view template in the class component

  onSubmit() {
    if(this.reservationForm.valid) {

      //call the reservationForm and access its value
      let reservation: Reservation = this.reservationForm.getRawValue();

      //check the current route url we're on and accessing the params (:id) to assign to id variable
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        //update reservation if exists
        this.reservationService.updateReservation(id, reservation).subscribe(() => {
          //programmatically redirect user using the .router.navigate method
          this.router.navigate(['/list'])
        })
      } else {
        //add if it doesn't exist
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log('add request processed')
          //programmatically redirect user using the .router.navigate method
          this.router.navigate(['/list'])
      })
    
    }

    }
  }
}
