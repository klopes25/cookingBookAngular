import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { User } from '../../../model/user';

@Component({
  selector: 'ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnChanges {
  @Input() items: Array<any> = [];
  @Input() edition = false;
  @Input() query = '';
  @Input() user: User = null;
  @Input() deltaPerson: number;
  @Input() nbPerson: number;
  @Input() units: Array<string>;
  groups: Array<any> = [];
  itemsTransformed: Array<any> = [];
  itemsToSave: Array<any> = [];
  openLegend = false;
  @Output() ingredientUpdated = new EventEmitter<any>();
  @ViewChild('newItemGroup', {static: false}) private newItemGroup: ElementRef<HTMLInputElement>;
  @ViewChild('newItemName', {static: false}) private newItemName: ElementRef<HTMLInputElement>;
  @ViewChild('newItemQuantity', {static: false}) private newItemQuantity: ElementRef<HTMLInputElement>;
  @ViewChild('newItemUnit', {static: false}) private newItemUnit: ElementRef<HTMLInputElement>;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges){
    this.itemsToSave = (changes && changes.items) ? this.items.map((i) => i) : this.itemsToSave;
    this.query = (changes && changes.query) ? changes.query.currentValue : this.query;
    this.transformItems();

    this.groups = [...new Set(this.itemsToSave.map((i) => (i.group === undefined) ? '' : i.group))];
    this.cdRef.detectChanges();
  }

  addIngredient(){
    if (this.newItemName.nativeElement.value !== ''){
      const newIngredient = {
        ingredient: this.newItemName.nativeElement.value,
        quantity: this.newItemQuantity.nativeElement.value,
        unit: this.newItemUnit.nativeElement.value,
        index: this.items.length,
        group: this.newItemGroup.nativeElement.value
      };

      this.itemsToSave.push(newIngredient);
      this.transformItems();
      // clear input
      this.newItemName.nativeElement.value = '';
      this.newItemQuantity.nativeElement.value = '';
      this.newItemUnit.nativeElement.value = '';
      this.newItemGroup.nativeElement.value = '';
    }
  }

  maj = (e, index, type) => {
    this.itemsToSave[index][type] = e.target.value;
  }

  updateIngredients = () => { this.ingredientUpdated.emit(this.itemsToSave); };

  deleteIngredient(i){
    this.itemsToSave.splice(i, 1); // remove the ith element of items
    this.transformItems();
  }

  down(i){
    if (i === (this.itemsToSave.length - 1)){
      return;
    }
    const switch1 = this.itemsToSave[i];
    const switch2 = this.itemsToSave[i + 1];
    this.itemsToSave[i] = switch2;
    this.itemsToSave[i + 1] = switch1;
    this.transformItems();
  }

  getIngredientsLegendClass(){
    return this.openLegend ? `ingredientsLegend open ${((this.groups.length > 1) && !this.edition) ? '' : 'disable'}` : `ingredientsLegend ${((this.groups.length > 1) && !this.edition) ? '' : 'disable'}`;
  }

  getQuantity(item){
    const quantityToDisplay = (item.quantity === '') ? '' : `:  ${this.getQuantityToDisplay(item.quantity * (Number(this.nbPerson) + this.deltaPerson) / Number(this.nbPerson), (item.unit === undefined) ? '' : item.unit)}`.trim();
    return quantityToDisplay;
  }

  getQuantityToDisplay(quantity: number, unit: string = ''){
    let q;
    if ((unit === 'gr') && (quantity >= 1000)){
      unit = 'kg';
      q = (quantity / 1000).toFixed(2); // limit to 2 number after the comma
    } else if ((unit === 'cl') && (quantity >= 100)){
      unit = 'L';
      q = (quantity / 100).toFixed(2);
    } else {
      q = quantity.toFixed(2);
    }

    const regexX0 = RegExp('[0-9]+.[0-9]0$');
    const regex00 = RegExp('[0-9]+.00$');

    const value = (regex00.test(q)) ? `${q}`.slice(0, -3) : (regexX0.test(q) ? `${q}`.slice(0, -1) : q);
    return `${value} ${unit}`;
  }

  toggleLegend = () => { this.openLegend = !this.openLegend; };

  transformItems(){
    this.itemsTransformed = this.itemsToSave.map((i) => {
      const queries = this.query.split(' ');
      const isMultiWords = queries.length > 1;
      const ingredientTransformed = {...i};
      if (isMultiWords){
        ingredientTransformed.ingredient = i.ingredient;
        queries.forEach(q => {
          ingredientTransformed.ingredient = (q.length > 2) ? ingredientTransformed.ingredient.replace(new RegExp(`(${q})`, 'gi'), '<mark>$1</mark>') : ingredientTransformed.ingredient;
        });
        return ingredientTransformed;
      } else {
        if (this.query.length > 2) {
          ingredientTransformed.ingredient = i.ingredient.replace(new RegExp(`(${this.query})`, 'gi'), '<mark>$1</mark>');
          return ingredientTransformed;
        }
      }
      return i;
    });
  }

  up(i){
    if (i === 0){
      return;
    }
    const switch1 = this.itemsToSave[i];
    const switch2 = this.itemsToSave[i - 1];
    this.itemsToSave[i] = switch2;
    this.itemsToSave[i - 1] = switch1;
    this.transformItems();
  }
}
