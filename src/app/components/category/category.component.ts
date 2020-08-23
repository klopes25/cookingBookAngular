import { Component, EventEmitter, Input, Output } from '@angular/core';

const categories = ['aperitif', 'entree', 'plat', 'dessert', 'boisson', 'autre'];

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @Input() category = 'plat';
  @Input() edition = false;
  @Output() categoryUpdated = new EventEmitter<string>();

  // Display the next category
  after() {
    const index = (categories.indexOf(this.category) === 5 ? 0 : categories.indexOf(this.category) + 1);
    // update locally
    this.category = categories[index];
    // update database
    this.categoryUpdated.emit(this.category);
  }

  // Display the previous category
  before() {
    const index = (categories.indexOf(this.category) === 0 ? 5 : categories.indexOf(this.category) - 1);
    // update locally
    this.category = categories[index];
    // update database
    this.categoryUpdated.emit(this.category);
  }
}
