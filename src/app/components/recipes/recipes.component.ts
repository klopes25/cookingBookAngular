import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../../model/recipe';
import { User } from 'src/model/user';

@Component({
  selector: 'recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  @Input() items: Array<Recipe>;
  @Input() user: User;
  @Output() recipeToBeDeleted = new EventEmitter<any>();
  @Output() recipeToBeShowed = new EventEmitter<any>();

  constructor() {
  }

  deleteRecipe(recipeID){
    this.recipeToBeDeleted.emit(recipeID);
  }

  showRecipe(recipeID){
    this.recipeToBeShowed.emit(recipeID);
  }
}
