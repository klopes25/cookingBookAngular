import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { User } from '../../../model/user';

@Component({
  selector: 'ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnChanges {
  @Input() items: Array<any> = [];
  @Input() edition: boolean = false;
  @Input() query: string = "";
  @Input() user: User = null;
  @Input() deltaPerson: number;
  @Input() nbPerson: number;
  groups: Array<any> = [];
  itemsTransformed: Array<any> = [];
  itemsToSave: Array<any> = [];
  openLegend: boolean = false;
  @Output() ingredientUpdated = new EventEmitter<any>();
  @ViewChild('newItemGroup', {static: false}) private newItemGroup: ElementRef<HTMLInputElement>;
  @ViewChild('newItemName', {static: false}) private newItemName: ElementRef<HTMLInputElement>;
  @ViewChild('newItemQuantity', {static: false}) private newItemQuantity: ElementRef<HTMLInputElement>;
  @ViewChild('newItemUnit', {static: false}) private newItemUnit: ElementRef<HTMLInputElement>;

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges){
    this.itemsToSave = (changes && changes['items']) ? this.items.map((i) => i) : this.itemsToSave;
    this.query = (changes && changes['query']) ? changes['query'].currentValue : this.query;
    this.transformItems();

    this.groups = [...new Set(this.itemsToSave.map((i) => (i.group === undefined) ? "" : i.group))];
    this.cdRef.detectChanges();
  }

  addIngredient(){
    if(this.newItemName.nativeElement.value !== ""){
      let newIngredient = {
        ingredient: this.newItemName.nativeElement.value,
        quantity: this.newItemQuantity.nativeElement.value,
        unit: this.newItemUnit.nativeElement.value,
        index: this.items.length,
        group: this.newItemGroup.nativeElement.value
      }
      this.itemsToSave.push(newIngredient);
      this.transformItems();
      // clear input
      this.newItemName.nativeElement.value = "";
      this.newItemQuantity.nativeElement.value = "";
      this.newItemUnit.nativeElement.value = "";
      this.newItemGroup.nativeElement.value = "";
    }
  }

  updateIngredients(){
    this.ingredientUpdated.emit(this.itemsToSave);
  }

  deleteIngredient(i){
    this.itemsToSave.splice(i, 1); // remove the ith element of items
    this.transformItems();
  }

  down(i){
    if(i=== (this.itemsToSave.length - 1)) return;
    const switch1 = this.itemsToSave[i];
    const switch2 = this.itemsToSave[i+1];
    this.itemsToSave[i] = switch2;
    this.itemsToSave[i+1] = switch1;
    this.transformItems();
  }

  getIngredientsLegendClass(){
    return this.openLegend ? `ingredientsLegend open ${((this.groups.length > 1) && !this.edition) ? '' : 'disable'}` : `ingredientsLegend ${((this.groups.length > 1) && !this.edition) ? '' : 'disable'}`
  }

  getQuantity(item){
    return (item.quantity === "") ? "" : `:  ${(item.quantity * (Number(this.nbPerson) + Number(this.deltaPerson)) / Number(this.nbPerson))} ${((item.unit === undefined) ? "" : item.unit)}`.trim();
  }

  toggleLegend(){
    this.openLegend = !this.openLegend;
  }

  transformItems(){
    this.itemsTransformed = this.itemsToSave.map((i) => {
      if(this.query.length > 2) {
        let ingredientTransformed = {...i};
        ingredientTransformed.ingredient = i.ingredient.replace(new RegExp(`(${this.query})`, 'gi'), '<mark>$1</mark>');
        return ingredientTransformed;
      }
      return i;
    });
  }

  up(i){
    if(i===0) return;
    const switch1 = this.itemsToSave[i];
    const switch2 = this.itemsToSave[i-1];
    this.itemsToSave[i] = switch2;
    this.itemsToSave[i-1] = switch1;
    this.transformItems();
  }
}
