import { HttpClient } from '@angular/common/http';
import { Injectable,  signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  apiUrl:string = 'https://743ef722-2574-4ca1-88f3-63238a52902c-00-24dm5qezjjxqk.pike.replit.dev'

  // private token = signal<string>('');
  // private refreshToken = signal<string>('');
  // private auth = signal<boolean>(false);
  // private userEmail = signal<string>('');

  // readToken = this.token.asReadonly();
  // readRefreshToken = this.refreshToken.asReadonly();
  // readAuth = this.auth.asReadonly();
  // readEmail = this.userEmail.asReadonly();

  //success/error message for UI
  successMessage = signal(false);
  errorMessage = signal(false);
  usernameExistError = signal(false);
  
  username = this.getToken() ? jwtDecode<{username: string}>(this.getToken() as string).username : null;

  constructor(
    private http: HttpClient,
  ) {
    
   }

  // setToken(token: string) {
  //   this.token.set(token);
  // }

  // setRefreshToken(refreshToken: string) {
  //   this.refreshToken.set(refreshToken);
  // }

  // setAuth(auth: boolean) {
  //   this.auth.set(auth);
  // }

  // setUserEmail(email: string) {
  //   this.userEmail.set(email);
  // }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  registerAccount(username: string, password: string): Observable<void> {
    // console.log({username, password})
    return this.http.post<void>(this.apiUrl + '/signup', {username, password})
  }

  registerThirdPartyAccount(username: string): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/login_third-party', {username})
  }

  loginAccount(username: string, password: string):Observable<{auth: boolean, token: string, refreshToken: string}> {
    return this.http.post<{auth: boolean, token: string, refreshToken: string}>(this.apiUrl + '/login', {username, password})
  }

  requestRefreshToken(refreshToken: string): Observable<{token: string}> {
    return this.http.post<{token: string}>(this.apiUrl + '/refresh_token', {refreshToken});
  }

  logoutAccount() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // this.setAuth(false);
    // this.setToken('');
    // this.setUserEmail('');
  }


}
