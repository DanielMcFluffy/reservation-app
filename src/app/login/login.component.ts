import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  //create an instance of FormGroup
  loginForm: FormGroup = new FormGroup({});

    //success/error message for UI
    successMessage = this.accountsService.successMessage
    errorMessage = this.accountsService.errorMessage

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private accountsService: AccountsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  
    //hides the alert messages after closing the component(modal) 
    ngOnDestroy(): void {
      this.accountsService.successMessage.set(false);
      this.accountsService.errorMessage.set(false);
      this.accountsService.usernameExistError.set(false);
    }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('opened');
    });
  }

  onLogin() {
    //extract out email/password
    const {email, password} = this.loginForm.value
    
    //plug them in here
    this.accountsService.loginAccount(email, password)
      .subscribe(
        ((authData) => {
          //extract out auth and token 
          const {auth, token} = authData
  
          //set the auth/token/email in accountsService
          this.accountsService.setToken(token);
          this.accountsService.setAuth(auth);
          this.accountsService.setUserEmail(email);
          if (auth) {
            this.successMessage.set(true);
            setTimeout(() => {
              this.router.navigate(['/list', 'user'])
            }, 1000);
          }

        }), 
        (error) => {
          
            this.errorMessage.set(true);

            setTimeout(() => {
              this.errorMessage.set(false)
            },2000)
          
        }
      )
  }
}

//tackle logic to get information about the login'ed user
//extract it out into a url params
//then implement an endpoint to get data based on a user
//use that to filter the reservation made by that specific user
