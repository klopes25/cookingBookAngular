import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  @Input() open: boolean;
  @Input() nextID: number;
  @Output() recipeFormClosed = new EventEmitter<any>();
  @Output() recipeAdded = new EventEmitter<any>();
  hasVideo: boolean = false;
  ingredients: Array<any> = [];
  steps: Array<any> = [];
  tags: Array<any> = [];
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

  //this.titleSelected.nativeElement.value

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

  addIngredientInput(){
    this.ingredients.push({
      index: this.ingredients.length,
      group: "",
      ingredient: "",
      quantity: "",
      unity: ""
    });
  }

  addStepInput(){
    this.steps.push({
      text: "",
      index: this.steps.length + 1
    })
  }

  addTagInput(){
    this.tags.push({ text: "" });
  }

  closeForm(){
    this.recipeFormClosed.emit();
  }

  toggleVideo(){
    this.hasVideo = !this.hasVideo;
  }

  valideRecipe(){
    // TODO check the content
    // create a recipe
    let newRecipe = {
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
      chiefTrick: (this.astuce.nativeElement.value.length === 0) ? "Aucune astuce !" : this.astuce.nativeElement.value,
      ingredients: this.ingredients,
      steps:this.steps,
      tags: this.tags.map( tag => tag.text),
      video: this.hasVideo
    };

    this.recipeAdded.emit(newRecipe);
  }

}
