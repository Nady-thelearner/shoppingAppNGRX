import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface authResponseData {
  kind: string;
  idToken: string;
  email: string;
  refereshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class authService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;
  constructor(private http: HttpClient, private route: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<authResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZSFEM0IW6EQFJcO65izdoTXo7aF-QjpA',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuhtentication(
            resData.email,
            resData.idToken,
            +resData.expiresIn,
            resData.idToken
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDur =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDur);
    }
  }

  login(email: string, password: string) {
    console.log(' 1 Login function called');
    return this.http
      .post<authResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZSFEM0IW6EQFJcO65izdoTXo7aF-QjpA',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuhtentication(
            resData.email,
            resData.idToken,
            +resData.expiresIn,
            resData.idToken
          );
        })
      );
  }

  logout() {
    console.log('logout in auth called');
    this.user.next(null);
    this.route.navigate(['/auth']);
    localStorage.removeItem('userData');

    //clearing autologout function
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration)
    this.tokenExpirationTimer = setTimeout(() => {
     this.logout();
    }, expirationDuration);
    console.log('Auth Service timer', this.tokenExpirationTimer);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Unknown Error Occured!!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Please enter valid email.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Please enter valid password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User account has been suspended.';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuhtentication(
    email: string,
    userId: string,
    expiresIn: number,
    token: string
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
