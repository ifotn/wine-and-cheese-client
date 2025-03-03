import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheeseService {

  // injecting HttpClient dependency at construct time for API calls
  constructor(private http: HttpClient) { }

  getCheeses() {
    return this.http.get('http://localhost:3000/api/v1/cheeses');
  }
}
