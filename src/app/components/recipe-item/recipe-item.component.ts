import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnChanges {
  @Input() item: any;
  @Input() user: User;
  @Output() recipeToBeDeleted = new EventEmitter<any>();
  @Output() recipeToBeShowed = new EventEmitter<any>();
  tape: string = "";

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges){
    if(changes && changes['item']){
      this.tape = this.getTape();
      this.cdRef.detectChanges();
    }
  }

  deleteRecipe(){
    this.recipeToBeDeleted.emit(this.item.recipeID);
  }

  getRealImageSrc(){
    return `../../assets/img/plats/${this.item.recipeID}.jpg`;
  }

  getTape(){
    return (Math.round(Math.random() * 2) > 1) ? "tape2" : "tape";
  }

  isValidated(){
    if(this.user === null) return false;
    return this.item.validatedBy.find((userID) => userID === this.user._id) !== undefined;
  }

  showRecipe(){
    this.recipeToBeShowed.emit(this.item.recipeID);
  }

}
