import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AccountsService } from './accounts.service';

export const activateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const accountsService = inject(AccountsService)
  const router = inject(Router)
  
  const token = accountsService.readToken();

  if(token) {
    return true
  } else {
    router.navigate(['/login'])
    return false
  }

};
