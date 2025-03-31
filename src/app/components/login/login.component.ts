import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  message: string = 'Please enter your credentials';
  messageClass: string = 'alert alert-info';
  apiResponse: any;
  verificationCode: string | undefined;
  loginOk: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }
  
  login() {
    // create user json from form
    const user = { 
      username: this.username,
      password: this.password
    }

    // try to login using service then api, wait for response
    return this.authService.login(user).subscribe({
      next: response => {
        this.apiResponse = response;

        // show 2FA code form
        this.loginOk = true;
        this.message = 'Please enter the Verification Code sent to your email.  It expires in 10 minutes';
        this.messageClass = 'alert alert-info';

        //console.log(this.apiReponse);
        // set global username property in authService
        // this.authService.setUsername(this.apiResponse.username);

        // redirect to cheese page - disabled for 2FA
        // this.router.navigate(['/cheese']);
      },
      error: err => {
        this.message = 'Invalid Login';
        this.messageClass = 'alert alert-danger';
      }
    });
  };

  verifyCode() {
    if (this.verificationCode == undefined) {
      this.message = 'Code cannot be empty';
      this.messageClass = 'alert alert-danger';
      return;
    }

    // create json to send to API for 2FA check
    const tempSession = {
      username: this.username,
      verificationCode: this.verificationCode
    };

    // call service 
    this.authService.verifyCode(tempSession).subscribe({
      next: response => {
        // set global username
        this.authService.setUsername(this.apiResponse.username);

        // redirect
        this.router.navigate(['/cheese']);
      },
      error: err => {
        this.message = 'Invalid Verification Code';
        this.messageClass = 'alert alert-danger';
      }
    });
  }
}
