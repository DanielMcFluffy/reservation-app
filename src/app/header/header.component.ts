import { Component, DoCheck, OnInit, computed } from '@angular/core';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, DoCheck {
  constructor(
    private accountService: AccountsService,
  ) {}
  isLogin!: boolean;

  ngDoCheck(): void {
    this.isLogin = this.accountService.readAuth();
  }

  ngOnInit(): void {
    this.accountService.readAuth();
    console.log(this.isLogin)
  }

  onLogout() {
    this.accountService.logoutAccount();
  }


}
