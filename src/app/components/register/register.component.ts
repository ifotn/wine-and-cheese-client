import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string | undefined;
  password: string | undefined;
  confirm: string | undefined;
  message: string = 'Please choose a strong password';
  messageClass: string = 'alert alert-info';
  apiResponse: any;

  constructor(private authService: AuthService) {}

  register() {
    // confirm password match
    if (this.password !== this.confirm) {
      this.message = 'Passwords do not match';
      this.messageClass = 'alert alert-danger';
      return;
    }

    // create new user json obj
    const user = {
      username: this.username,
      password: this.password
    };

    // call service, which calls API, wait for response
    return this.authService.register(user).subscribe({
      next: response => {
        this.apiResponse = response;
        //console.log(this.apiResponse);
        this.message = 'Registration Successful';
        this.messageClass = 'alert alert-success';
      },
      error: err => {
        this.message = err.message;
        this.messageClass = 'alert alert-danger';
      }
    })
  }
}
