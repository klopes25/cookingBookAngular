import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../model/user';

@Component({
  selector: 'menu-global',
  templateUrl: './menu-global.component.html',
  styleUrls: ['./menu-global.component.scss']
})
export class MenuGlobalComponent implements OnChanges {
  @Input() user: User | null;
  @Input() inShopping: boolean;
  @Output() createRecipeOpened = new EventEmitter<any>();
  @Output() randomRecipeOpened = new EventEmitter<string>();
  @Output() shoppingListOpened = new EventEmitter<any>();

  isAdmin = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges){
    if (changes && (changes.user)){
      this.isAdmin = (changes.user.currentValue !== null) && (changes.user.currentValue.role === 'admin');
    }
  }

  openCreateRecipe = () => { this.createRecipeOpened.emit(); };

  randomApero = () => { this.randomRecipeOpened.emit('aperitif'); };

  randomEntree = () => { this.randomRecipeOpened.emit('entree'); };

  randomPlat = () => { this.randomRecipeOpened.emit('plat'); };

  randomDessert = () => { this.randomRecipeOpened.emit('dessert'); };

  randomBoisson = () => { this.randomRecipeOpened.emit('boisson'); };

  showShoppingList = () => { this.shoppingListOpened.emit(); };

}
