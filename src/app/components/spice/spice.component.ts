import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'spice',
  templateUrl: './spice.component.html',
  styleUrls: ['./spice.component.scss']
})
export class SpiceComponent {
  @Input() spicy: number;
  @Input() edition: boolean;
  @Output() spiceUpdated = new EventEmitter<any>();

  constructor() { }

  getSpicyClass(){
    return `spices level${this.spicy} ${this.edition ? "edition" : ""}`;
  }

  updateSpices(i){
    this.spicy += i;
    this.spiceUpdated.emit(this.spicy);
  }

}
