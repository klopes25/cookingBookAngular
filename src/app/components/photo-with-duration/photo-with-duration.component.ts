import { ChangeDetectorRef, Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { isNil } from 'lodash-es';

@Component({
  selector: 'photo-with-duration',
  templateUrl: './photo-with-duration.component.html',
  styleUrls: ['./photo-with-duration.component.css']
})
export class PhotoWithDurationComponent implements OnChanges {
  @Input() preparationTime: string;
  @Input() cookingTime: string;
  @Input() restPeriod: string;
  @Input() nbPerson: number;
  @Input() nbPersonUnit: string;
  @Input() edition: boolean;
  @Input() id: number;
  @Input() recipeTitle: string;
  @Input() deltaPerson: number;
  @Output() preparationTimeUpdated = new EventEmitter<any>();
  @Output() cookingTimeUpdated = new EventEmitter<any>();
  @Output() restPeriodUpdated = new EventEmitter<any>();
  @Output() nbPersonUpdated = new EventEmitter<any>();
  @Output() unitChanged = new EventEmitter<any>();
  @Output() deltaUpdated = new EventEmitter<any>();
  srcFood = '../../../assets/img/plats/default.jpg';
  newPreparationTime: string = "";
  newCookingTime: string = "";
  newRestPeriod: string = "";
  newNbPerson: string = "";

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnChanges (changes: SimpleChanges){
    let hasChangement = false;
    if((!isNil(changes.id)) && (!isNil(changes.id.currentValue))){
      hasChangement = true;
      this.srcFood = `../../../assets/img/plats/${this.id}.jpg`;
    }
    if((!isNil(changes.preparationTime)) && (!isNil(changes.preparationTime.currentValue))){
      hasChangement = true;
      this.newPreparationTime = changes.preparationTime.currentValue;
    }
    if((!isNil(changes.cookingTime)) && (!isNil(changes.cookingTime.currentValue))){
      hasChangement = true;
      this.newCookingTime = changes.cookingTime.currentValue;

    }
    if((!isNil(changes.restPeriod)) && (!isNil(changes.restPeriod.currentValue))){
      hasChangement = true;
      this.newRestPeriod = changes.restPeriod.currentValue;

    }
    if((!isNil(changes.nbPerson)) && (!isNil(changes.nbPerson.currentValue))){
      hasChangement = true;
      this.newNbPerson = changes.nbPerson.currentValue;

    }
    if(hasChangement) this.cdRef.detectChanges();
  }

  changeUnit = () => { this.unitChanged.emit((this.nbPersonUnit==="Pers.") ? "Pièces" : "Pers." ) }

  editCookTime = () => { this.cookingTimeUpdated.emit(`${this.newCookingTime}`) };

  editNbPerson = () => { this.nbPersonUpdated.emit(`${this.newNbPerson}`) };

  editPrepTime = () => { this.preparationTimeUpdated.emit(`${this.newPreparationTime}`) };

  editRestPeriod = () => { this.restPeriodUpdated.emit(`${this.newRestPeriod}`) };

  getNbPerson = () => Number(this.nbPerson) + this.deltaPerson;

  getUnitClass = () => `nbPersonUnit fas ${(this.nbPersonUnit === "Pers.") ? "icon-user" : "icon-cookie-bite"}`;

  lessGuestsTonight(){
    if((Number(this.nbPerson) + this.deltaPerson) <= 1) return;
    this.deltaPerson -= 1;
    this.deltaUpdated.emit(this.deltaPerson);
  };

  moreGuestsTonight(){
    this.deltaPerson += 1;
    this.deltaUpdated.emit(this.deltaPerson);
  };
}
