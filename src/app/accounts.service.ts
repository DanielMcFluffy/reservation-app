import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  apiUrl:string = 'https://743ef722-2574-4ca1-88f3-63238a52902c-00-24dm5qezjjxqk.pike.replit.dev'

  private token = signal<string>('');
  private auth = signal<boolean>(false);
  private userEmail = signal<string>('');

  public isLogin = computed(() => Boolean(this.token))

  readToken = this.token.asReadonly();
  readAuth = this.auth.asReadonly();
  readEmail = this.userEmail.asReadonly();

  //success/error message for UI
  successMessage = signal(false);
  errorMessage = signal(false);
  usernameExistError = signal(false);

  constructor(
    private http: HttpClient,
  ) { }

  setToken(token: string) {
    this.token.set(token);
  }

  setAuth(auth: boolean) {
    this.auth.set(auth);
  }

  setUserEmail(email: string) {
    this.userEmail.set(email);
  }

  registerAccount(username: string, password: string): Observable<void> {
    // console.log({username, password})
    return this.http.post<void>(this.apiUrl + '/signup', {username, password})
  }

  loginAccount(username: string, password: string):Observable<{auth: boolean, token: string}> {
    return this.http.post<{auth: boolean, token: string}>(this.apiUrl + '/login', {username, password})
  }

  logoutAccount() {
    this.setAuth(false);
    this.setToken('');
    this.setUserEmail('');
  }

}
