import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model'

export interface AuthResponseData{
  idToken: string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
 user = new BehaviorSubject<User>(null);
 private tokenExpirationTimer: any;
 constructor(private http: HttpClient, private router: Router) {}
 signup(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEqux7Gi_O7IZ7ZtNr4X-ejwfMMKL43go',
    {
       email: email,
       password: password,
       returnSecureToken: true
     })
     .pipe(
       catchError(this.handleError),
       tap(resData => {
         this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
       })
     );
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEqux7Gi_O7IZ7ZtNr4X-ejwfMMKL43go',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    )
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
    );
  }
  
  autoLogin(){
    const userData:{
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
     } = JSON.parse(localStorage.getItem('UserData'));
    if(!userData){
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();     //calculate remaining time for auto logout
      this.autoLogout(expirationDuration)
    }

  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth'])
    localStorage.removeItem('UserData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
      this.tokenExpirationTimer= setTimeout(()=>{this.logout()},expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime()+ expiresIn * 1000);
    const user = new User(email,userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('UserData',JSON.stringify(user))
  }

  private  handleError(errorRes: HttpErrorResponse){
    let errorMsg = "An Unknown Error occurred";
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMsg)
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMsg = "E-mail exists already";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = "Invalid credentials";
        break;
      case 'INVALID_PASSWORD':
        errorMsg = "Invalid credentials";
        break;
      }
    return throwError(errorMsg)
  }
   
}
