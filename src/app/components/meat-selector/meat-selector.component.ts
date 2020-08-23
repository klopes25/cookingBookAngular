import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'meat-selector',
  templateUrl: './meat-selector.component.html',
  styleUrls: ['./meat-selector.component.scss']
})
export class MeatSelectorComponent implements AfterViewInit, OnChanges {
  @Input() meat: string;
  @Input() edition: boolean;
  @Output() meatChanged = new EventEmitter<any>();
  meatSrc = '';

  constructor(private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.meatSrc = `../../../assets/img/stamp${this.meat === '' ? '' : `-${this.meat}`}.svg`;
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes && changes.meat){
      this.meatSrc = `../../../assets/img/stamp${changes.meat.currentValue === '' ? '' : `-${changes.meat.currentValue}`}.svg`;
      this.cdRef.detectChanges();
    }
  }

  changeMeat = (id: number) => {
    let newMeat = `${this.meat}`;

    switch (id) {
      case 1: { newMeat = ''; break; } // clear
      case 2: { newMeat = `boeuf${newMeat}`; break; } // boeuf : compatibility with porc
      case 3: { newMeat = 'canard'; break; } // canard : not compatible
      case 4: { newMeat = `${newMeat}crustace`; break; }  // crustace
      case 5: { newMeat = `mouton${newMeat}`; break; } // mouton
      case 6: { // poulet
        if (newMeat === 'mouton'){
          newMeat = 'moutonpoulet';
        } else {
          newMeat = `poulet${newMeat}`;
        }
        break;
      }
      case 7: { // porc
        if ((newMeat === 'boeuf') || (newMeat === 'poulet')) {
          newMeat = `${newMeat}porc`;
        } else {
          newMeat = `porc${newMeat}`;
        }
        break;
      }
      case 8: { newMeat = `${newMeat}poisson`; break; } // poisson
      case 9: { newMeat = 'vegetable'; break; } // vegetable : not compatible
      default: newMeat = '';
    }

    this.meatChanged.emit(newMeat);
}

  compatibility = (id: number) => {
    let result = '';

    switch (id) {
      case 2: {
        if ((this.meat !== 'porc') && (this.meat !== '')) { // boeuf : compatibility with porc
          result = 'disable';
        }
        break;
      }
      case 3: {
        if (this.meat !== '') { // canard : not compatible
          result = 'disable';
        }
        break;
      }
      case 4: { // crustace
        if ((this.meat !== 'porc') && (this.meat !== 'poulet') && (this.meat !== '')){
          result = 'disable';
        }
        break;
      }
      case 5: { // mouton
        if ((this.meat !== 'poulet') && (this.meat !== '')){
          result = 'disable';
        }
        break;
      }
      case 6: { // poulet
        if ((this.meat !== 'porc') && (this.meat !== 'mouton') && (this.meat !== 'crustace') && (this.meat !== '')){
          result = 'disable';
        }
        break;
      }
      case 7: { // porc
        if ((this.meat !== 'poisson') && (this.meat !== 'poulet') && (this.meat !== 'crustace') && (this.meat !== 'boeuf') && (this.meat !== '')){
          result = 'disable';
        }
        break;
      }
      case 8: { // poisson
        if ((this.meat !== 'porc') && (this.meat !== '')){
          result = 'disable';
        }
        break;
      }
      case 9: { // vegetable : not compatible
        if (this.meat !== ''){
          result = 'disable';
        }
        break;
      }
      default: result = '';
    }
    return result;
}

 getMeatClass = (id) => `${this.edition ? 'visibleImg' : ''} ${this.compatibility(id)}`;

}
