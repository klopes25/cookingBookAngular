import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnChanges {
  @Input() open: boolean;
  @Input() nextID: number;
  @Input() units: Array<string>;
  @Output() recipeFormClosed = new EventEmitter<any>();
  @Output() recipeAdded = new EventEmitter<any>();
  hasVideo = false;
  ingredients: Array<any> = [];
  steps: Array<any> = [];
  tags: Array<any> = [];
  errors: Array<string> = [];
  @ViewChild('titleSelected', {static: false}) private titleSelected: ElementRef<HTMLInputElement>;
  @ViewChild('categorySelected', {static: false}) private categorySelected: ElementRef<HTMLSelectElement>;
  @ViewChild('meatSelected', {static: false}) private meatSelected: ElementRef<HTMLSelectElement>;
  @ViewChild('spiceSelected', {static: false}) private spiceSelected: ElementRef<HTMLSelectElement>;
  @ViewChild('preparationTime', {static: false}) private preparationTime: ElementRef<HTMLInputElement>;
  @ViewChild('preparationUnit', {static: false}) private preparationUnit: ElementRef<HTMLSelectElement>;
  @ViewChild('cookingTime', {static: false}) private cookingTime: ElementRef<HTMLInputElement>;
  @ViewChild('cookingUnit', {static: false}) private cookingUnit: ElementRef<HTMLSelectElement>;
  @ViewChild('sleepTime', {static: false}) private sleepTime: ElementRef<HTMLInputElement>;
  @ViewChild('sleepUnit', {static: false}) private sleepUnit: ElementRef<HTMLSelectElement>;
  @ViewChild('nbPerson', {static: false}) private nbPerson: ElementRef<HTMLInputElement>;
  @ViewChild('nbPersonUnit', {static: false}) private nbPersonUnit: ElementRef<HTMLSelectElement>;
  @ViewChild('astuce', {static: false}) private astuce: ElementRef<HTMLInputElement>;

  categories = [
    { value: 'aperitif', label: '🥨 Apéritif' },
    { value: 'autre', label: '🍞 Autre (pains, sauces, pâtes...)' },
    { value: 'boisson', label: '🍹 Boisson' },
    { value: 'dessert', label: '🍰 Dessert' },
    { value: 'entree', label: '🥗 Entrée' },
    { value: 'plat', label: '🍝 Plat' }
  ];

  meats = [
    { value: '', label: '⛔ Aucune' },
    { value: 'boeuf', label: '🐄 Boeuf' },
    { value: 'boeufporc', label: '🐄🐖 Boeuf & porc' },
    { value: 'canard', label: '🦆 Canard' },
    { value: 'crustace', label: '🦐 Crustacés' },
    { value: 'mouton', label: '🐑 Mouton' },
    { value: 'moutonpoulet', label: '🐑🐓 Mouton & poulet' },
    { value: 'poisson', label: '🐟 Poisson' },
    { value: 'porc', label: '🐖 Porc' },
    { value: 'porccrustace', label: '🐖🦐 Porc & crustacés' },
    { value: 'porcpoisson', label: '🐖🐟 Porc & poisson' },
    { value: 'poulet', label: '🐓 Poulet' },
    { value: 'pouletcrustace', label: '🐓🦐 Poulet & crustacés' },
    { value: 'pouletporc', label: '🐓🐖 Poulet & porc' },
    { value: 'vegetable', label: '🥕 Végétarien' }
  ];

  spices = [
    { value: 0, label: '👌 Pas du tout piquant' },
    { value: 1, label: '🔥 Ca piquote un peu' },
    { value: 2, label: '🔥🔥 C\'est moi ou il fait chaud ici ?' },
    { value: 3, label: '🔥🔥🔥 Appelez les pompiers !!!' },
  ];

  times = [
    { value: 'min', label: 'Minutes' },
    { value: 'h', label: 'Heures' },
    { value: 'j', label: 'Jours' }
  ];

  parts = [
    { value: 'Pers.', label: 'Personnes' },
    { value: 'Pièces', label: 'Pièces' }
  ];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.open && changes.open.currentValue){
      // clear the fields
      this.categorySelected.nativeElement.value = '';
      this.titleSelected.nativeElement.value = '';
      this.preparationTime.nativeElement.value = '';
      this.preparationUnit.nativeElement.value = '';
      this.cookingTime.nativeElement.value = '';
      this.cookingUnit.nativeElement.value = '';
      this.sleepTime.nativeElement.value = '';
      this.sleepUnit.nativeElement.value = '';
      this.nbPerson.nativeElement.value = '';
      this.nbPersonUnit.nativeElement.value = '';
      // calories: number; // default 0
      this.spiceSelected.nativeElement.value = '';
      this.meatSelected.nativeElement.value = '';
      this.astuce.nativeElement.value = 'Aucune astuce !';
      this.ingredients = [];
      this.steps = [];
      this.tags = [];
      this.hasVideo = false;
    }
  }

  addIngredientInput(){
    this.ingredients.push({
      index: this.ingredients.length,
      group: '',
      ingredient: '',
      quantity: '',
      unit: ''
    });
  }

  addStepInput(){
    this.steps.push({
      text: '',
      index: this.steps.length + 1
    });
  }

  addTagInput(){
    this.tags.push({ text: '' });
  }

  closeForm(){
    this.recipeFormClosed.emit();
  }

  toggleVideo(){
    this.hasVideo = !this.hasVideo;
  }

  valideRecipe(){
    // Check the content
    this.errors = [];
    if (this.titleSelected.nativeElement.value === '') {
      this.errors.push('You need to type a title for the recipe !');
    }
    if (this.categorySelected.nativeElement.value === '') {
      this.errors.push('You need to select a category for the recipe !');
    }
    if ((this.preparationTime.nativeElement.value === '') || (this.preparationUnit.nativeElement.value === '')){
      this.errors.push('You need to type a preparation time and its unit !');
    }
    if ((this.cookingTime.nativeElement.value === '') || (this.cookingUnit.nativeElement.value === '')) {
      this.errors.push('You need to type a cooking time and its unit !');
    }
    if ((this.sleepTime.nativeElement.value === '') || (this.sleepTime.nativeElement.value === '')){
      this.errors.push('You need to type a sleep time and its unit !');
    }
    if ((this.nbPerson.nativeElement.value === '') || (this.nbPersonUnit.nativeElement.value === '')){
      this.errors.push('You need to indicate how many people this fabulous recipe is for...');
    }
    if (this.spiceSelected.nativeElement.value === ''){
      this.errors.push('You need to indicate the spice level (please)');
    }
    if (this.spiceSelected.nativeElement.value === ''){
      this.errors.push('You need to indicate the spice level (please)');
    }
    if (this.ingredients.length === 0){
      this.errors.push('You need at least one ingredient to make a recipe man!');
    }
    if (this.steps.length === 0){
      this.errors.push('You need at least one step to make a recipe man!');
    }
    if (this.tags.length === 0){
      this.errors.push('Come on! At least one tag!');
    }

    if (this.errors.length > 0) {
      return;
    }

    // create a recipe
    const newRecipe = {
      recipeID: this.nextID,
      category: this.categorySelected.nativeElement.value,
      title: this.titleSelected.nativeElement.value,
      prepPeriod: `${this.preparationTime.nativeElement.value} ${this.preparationUnit.nativeElement.value}`,
      cookPeriod: `${this.cookingTime.nativeElement.value} ${this.cookingUnit.nativeElement.value}`,
      restPeriod: `${this.sleepTime.nativeElement.value} ${this.sleepUnit.nativeElement.value}`,
      nbPeople: this.nbPerson.nativeElement.value,
      nbPeopleUnit: this.nbPersonUnit.nativeElement.value,
      // calories: number; // default 0
      spicy: this.spiceSelected.nativeElement.value,
      meatClass: this.meatSelected.nativeElement.value,
      chiefTrick: (this.astuce.nativeElement.value.length === 0) ? 'Aucune astuce !' : this.astuce.nativeElement.value,
      ingredients: this.ingredients,
      steps: this.steps,
      tags: this.tags.map( tag => tag.text),
      video: this.hasVideo
    };
    // clear the errors;
    this.errors = [];

    this.recipeAdded.emit(newRecipe);
  }

}
