import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';
import { AccountsService } from '../../shared/accounts.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-control',
  templateUrl: './profile-control.component.html',
  styleUrl: './profile-control.component.css',
})
export class ProfileControlComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private accountsService: AccountsService,
    private router: Router
  ) {}

  //properties to store localStorage for conditional rendering
  token?: string | null;

  //username property
  username?: string;

  ngOnInit(): void {
    this.token = this.accountsService.getToken();

    if (this.token) {
      const { username } = jwtDecode<{ username: string }>(this.token);
      this.username = username;
    }
  }

  onLogin() {
    const loginRef = this.dialog.open(LoginComponent, {});

    loginRef.afterClosed().subscribe(() => {
      this.token = this.accountsService.getToken();
      if (this.token) {
        const { username } = jwtDecode<{ username: string }>(this.token);
        this.username = username;
      }
    });
    // this.token = localStorage.getItem('accessToken');
    // console.log(this.token);
  }

  onLogout() {
    this.accountsService.logoutAccount();
    this.token = this.accountsService.getToken();
    this.router.navigate(['/login']);
  }
}
