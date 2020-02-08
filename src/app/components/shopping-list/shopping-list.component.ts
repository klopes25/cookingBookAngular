import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  @Input() open: boolean;
  @Input() items: Array<any> = [];
  @Output() shoppingListClosed = new EventEmitter<any>();
  @Output() shoppingListToBeCleaned = new EventEmitter<any>();
  @Output() shoppingListToBeCleared = new EventEmitter<any>();
  @Output() shoppingItemChecked = new EventEmitter<any>();

  constructor() { }

  check(name){
    this.shoppingItemChecked.emit(name);
  }

  cleanCart(){
    this.shoppingListToBeCleaned.emit();
  }

  clearCart(){
    this.shoppingListToBeCleared.emit();
  }

  closeShoppingList(){
    this.shoppingListClosed.emit();
  }

  getWidth(){
    return `${(this.items.length === 0) ? 0 : Math.round((this.items.filter((i) => i.checked).length * 100) / this.items.length)}%`;
  }
}
