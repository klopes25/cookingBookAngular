import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../model/user';

@Component({
  selector: 'menu-global',
  templateUrl: './menu-global.component.html',
  styleUrls: ['./menu-global.component.css']
})
export class MenuGlobalComponent {
  @Input() user: User | null;
  @Input() inShopping: boolean;
  @Output() createRecipeOpened = new EventEmitter<any>();
  @Output() randomRecipeOpened = new EventEmitter<string>();
  @Output() shoppingListOpened = new EventEmitter<any>();

  constructor() { }

  isAdmin(): boolean {
    return (this.user !== null) && (this.user.role === "admin");
  }

  openCreateRecipe(){
    this.createRecipeOpened.emit();
  }

  randomApero(){
    this.randomRecipeOpened.emit("aperitif");
  }

  randomEntree(){
    this.randomRecipeOpened.emit("entree");
  }

  randomPlat(){
    this.randomRecipeOpened.emit("plat");
  }

  randomDessert(){
    this.randomRecipeOpened.emit("dessert");
  }

  randomBoisson(){
    this.randomRecipeOpened.emit("boisson");
  }

  showShoppingList(){
    this.shoppingListOpened.emit();
  }

}
