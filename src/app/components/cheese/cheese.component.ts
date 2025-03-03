import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CheeseService } from '../../services/cheese.service';

export class Cheese {
  _id: string | undefined;
  name: string | undefined;
}

@Component({
  selector: 'app-cheese',
  imports: [NgFor],
  templateUrl: './cheese.component.html'
})
export class CheeseComponent implements OnInit {

  CHEESES: any;

  constructor(private service: CheeseService) {}

  getCheeses(): void {
    this.service.getCheeses().subscribe(response => {
      this.CHEESES = response;
    })
  }

  ngOnInit() {
    this.getCheeses();
  }

  // CHEESES: Cheese[] = [
  //   { _id: 'abc123', name: 'Cheddar' },
  //   { _id: 'def456', name: 'Gouda' },
  //   { _id: 'ghi789', name: 'Feta' }
  // ];
}
