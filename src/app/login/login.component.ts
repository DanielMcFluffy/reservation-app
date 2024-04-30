import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { AccountsService } from '../shared/accounts.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  //create an instance of FormGroup
  loginForm: FormGroup = new FormGroup({});

  //success/error message for UI
  successMessage = this.accountsService.successMessage;
  errorMessage = this.accountsService.errorMessage;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private accountsService: AccountsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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

  async handleGoogleSignIn() {
    try {
      await this.authService.loginGoogle(); // Wait for sign-in to complete
      if (this.accountsService.getToken()) {
        // Check token after sign-in completes
        this.successMessage.set(true);
        setTimeout(() => {
          console.log('Navigating to user list...');
          this.router.navigate(['/list', 'user']);
        }, 1000);
      }
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  }

  onLogin() {
    // //extract out email/password
    // const {email, password} = this.loginForm.value
    // //plug them in here
    // this.accountsService.loginAccount(email, password)
    //   .subscribe(
    //     ((authData) => {
    //       //extract out auth and token
    //       const {auth, token, refreshToken} = authData
    //       console.log(authData)
    //       //set token in localstorage
    //       localStorage.setItem('accessToken', token);
    //       localStorage.setItem('refreshToken', refreshToken);
    //       //set the auth/token/email in accountsService
    //       // this.accountsService.setToken(token);
    //       // this.accountsService.setRefreshToken(refreshToken);
    //       // this.accountsService.setAuth(auth);
    //       // this.accountsService.setUserEmail(email);
    //       if (token && refreshToken) {
    //         this.successMessage.set(true);
    //         setTimeout(() => {
    //           console.log("Navigating to user list...");
    //           this.router.navigate(['/list', 'user'])
    //         }, 1000);
    //       }
    //     }),
    //     (error) => {
    //         this.errorMessage.set(true);
    //         setTimeout(() => {
    //           this.errorMessage.set(false)
    //         },2000)
    //     }
    //   )
  }
}
