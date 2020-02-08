import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from 'src/model/recipe';
import { User } from 'src/model/user';
import { RecipesService } from '../../service/recipes.service';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  @Input() currentRecipe: Recipe;
  @Input() user: User | null;
  @Input() query: string;
  @Input() editionMode: boolean;
  @Input() deltaPerson: number;
  @Output() editionModeActivated = new EventEmitter<any>();
  @Output() titleToBeUpdated = new EventEmitter<string>();
  @Output() recipeMarked = new EventEmitter<any>();
  @Output() meatUpdated = new EventEmitter<any>();
  @Output() spiceUpdated = new EventEmitter<any>();
  @Output() ingredientsUpdated = new EventEmitter<any>();
  @Output() preparationTimeUpdated = new EventEmitter<any>();
  @Output() cookingTimeUpdated = new EventEmitter<any>();
  @Output() restPeriodUpdated = new EventEmitter<any>();
  @Output() nbPersonUpdated = new EventEmitter<any>();
  @Output() unitUpdated = new EventEmitter<any>();
  @Output() deltaUpdated = new EventEmitter<any>();
  @Output() categoryUpdated = new EventEmitter<any>();
  @Output() stepsUpdated = new EventEmitter<any>();
  @Output() chiefTipUpdated = new EventEmitter<any>();
  @Output() tagsUpdated = new EventEmitter<any>();
  @Output() commentCreated = new EventEmitter<any>();
  @Output() commentDeleted = new EventEmitter<any>();
  @Output() commentUpdated = new EventEmitter<any>();
  @Output() videoUpdated = new EventEmitter();

  constructor(private recipesService: RecipesService) { }

  addMark = (mark) => { this.recipeMarked.emit(mark) };

  createComment = (comment) => { this.commentCreated.emit(comment) };

  deleteComment = (commentDate: any) => { this.commentDeleted.emit(commentDate) };

  updatePreparationTime = (prep) => { this.preparationTimeUpdated.emit(prep) };
  updateCookingTime = (cookTime) => { this.cookingTimeUpdated.emit(cookTime) };
  updateRestPeriod = (rest) => { this.restPeriodUpdated.emit(rest) };
  updateNbPerson = (nbPers) => { this.nbPersonUpdated.emit(nbPers) };
  updateUnit = (unit) => { this.unitUpdated.emit(unit) };
  updateDelta = (delta) => { this.deltaUpdated.emit(delta) };
  updateCategory = (cat) => { this.categoryUpdated.emit(cat) };
  updateSteps = (steps) => { this.stepsUpdated.emit(steps) };
  updateChiefTip = (tip) => { this.chiefTipUpdated.emit(tip) };
  updateTags = (tags) => { this.tagsUpdated.emit(tags) };

  updateIngredients = (ingredients) => { this.ingredientsUpdated.emit(ingredients) }

  canVote = () => (this.user != null) && !this.user.votedFor.includes(this.currentRecipe.recipeID);

  editTitle = (newTitle) => { this.titleToBeUpdated.emit(newTitle) };

  getRole = () => (this.user !== null) ? this.user.role : "user";

  isRecipeValidated(){
    if(this.user === null) return false;
    return this.currentRecipe.validatedBy.find((userID) => userID === this.user._id) !== undefined;
  }

  toggleEditionMode = () => { this.editionModeActivated.emit() }

  toggleVideo = () => { this.videoUpdated.emit() }

  updateComment = (data) => { this.commentUpdated.emit(data) }

  updateMeat = (meat) => { this.meatUpdated.emit(meat) }

  updateSpice = (spice) => { this.spiceUpdated.emit(spice) }
}
