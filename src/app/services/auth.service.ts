import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // read domain of API from env file, make available in this file for all methods
  serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(`${this.serverUrl}/users/register`, user);
  }
}
