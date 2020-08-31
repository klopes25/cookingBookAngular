import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Counters
  @Input() users: Array<any>;
  @Input() nbRecipes: Number;
  // Histo
  @Input() categoriesCounter: any;
  // Podium
  @Input() firstTag = "Toto";
  @Input() secondTag = "Titi";
  @Input() ThirdTag = "Tata";
  // 

  labels = [];
  values = [];

  constructor() { }

  ngOnInit(): void {
    this.labels = Object.keys(this.categoriesCounter);
    this.values = Object.values(this.categoriesCounter);
  }

}
