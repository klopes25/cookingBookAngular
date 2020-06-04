import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Recipe } from 'src/model/recipe';
import { User } from 'src/model/user';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Input() user: User | null = null;
  @Input() currentRecipe: Recipe | null = null;
  @Output() filterChanged = new EventEmitter<any>();
  @Output() recipeValidated = new EventEmitter<any>();
  @Output() addedToCart = new EventEmitter<any>();
  @ViewChild('hotMinElement', {static: false}) private hotMinElement: ElementRef<HTMLInputElement>;
  @ViewChild('hotMaxElement', {static: false}) private hotMaxElement: ElementRef<HTMLInputElement>;
  @ViewChild('starMinElement', {static: false}) private starMinElement: ElementRef<HTMLInputElement>;
  @ViewChild('starMaxElement', {static: false}) private starMaxElement: ElementRef<HTMLInputElement>;
  hotHover = false;
  rankHover = false;

  filters: any = {
    'onlyValidated': false,
    'onlyNew': false,
    'onlyDislike': false,
    'hot': false,
    'hotMin': 0,
    'hotMax': 3,
    'star': false,
    'starMin': 0,
    'starMax': 5
  };

  constructor(private cdRef:ChangeDetectorRef) { }

  addToCart = () => { this.addedToCart.emit() };

  dontBubble = (event) => { event.stopPropagation() };

  addHoverHot = () => { this.hotHover = true };

  removeHoverHot = () => { this.hotHover = false };

  addHoverRank = () => { this.rankHover = true };

  removeHoverRank = () => { this.rankHover = false }

  isRecipeSelected = () => (this.currentRecipe !== null);

  isUserConnected = () => (this.user !== null);

  print = () => { window.print() };

  toggleHot = () => {
    this.filters.hot = !this.filters.hot;
    this.filterChanged.emit(this.filters);
  }

  toggleOnlyDislike = () => {
    this.filters.onlyDislike = !this.filters.onlyDislike;
    this.filterChanged.emit(this.filters);
  }

  toggleOnlyNew = () => {
    this.filters.onlyNew = !this.filters.onlyNew;
    this.filterChanged.emit(this.filters);
  }

  toggleOnlyValidated = () => {
    this.filters.onlyValidated = !this.filters.onlyValidated;
    this.filterChanged.emit(this.filters);
  }

  toggleStar = () => {
    this.filters.star = !this.filters.star;
    this.filterChanged.emit(this.filters);
  }

  updateMinMaxHot = () => {
    let min = Number(this.hotMinElement.nativeElement.value);
    let max = Number(this.hotMaxElement.nativeElement.value);

    if(min > max){
      this.filters.hotMin = min;
      this.filters.hotMax = min;
    } else {
      this.filters.hotMin = min;
      this.filters.hotMax = max;
    }
    this.filters.hot = true;
    this.hotMinElement.nativeElement.value = `${min}`;
    this.hotMaxElement.nativeElement.value = `${min}`;
    this.cdRef.detectChanges();

    this.filterChanged.emit(this.filters);
  }

  updateMinMaxStar = () => {
    let min = Number(this.starMinElement.nativeElement.value);
    let max = Number(this.starMaxElement.nativeElement.value);

    if(min > max){
      this.filters.starMin = min;
      this.filters.starMax = min;
    } else {
      this.filters.starMin = min;
      this.filters.starMax = max;
    }
    this.filters.star = true;
    this.starMinElement.nativeElement.value = `${min}`;
    this.starMaxElement.nativeElement.value = `${min}`;
    this.cdRef.detectChanges();

    this.filterChanged.emit(this.filters);
  }

  validate = () => {
    this.recipeValidated.emit();
  }

}
