import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
   isLogInmode = true;
   isLoading = false;
   error : string;
   
  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchmode(){
    this.isLogInmode = !this.isLogInmode;
  }
  onSubmit(form: NgForm){
    console.log(form.value)
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.pwd;
    this.isLoading = true;
    let authObj : Observable<AuthResponseData>;
    if(this.isLogInmode){
      authObj = this.authservice.login(email,password)
    }
    else{
      authObj = this.authservice.signup(email,password)
      form.reset()
    }
    
    authObj.subscribe(
      resData => {
        console.log(resData)
        this.isLoading = false;
        this.router.navigate(['/arts'])
      },
      errorMsg => {
        console.log(errorMsg)
        this.error = errorMsg;
        this.isLoading = false;
      }
    )
    
  }
}
