import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'chief-tip',
  templateUrl: './chief-tip.component.html',
  styleUrls: ['./chief-tip.component.scss']
})
export class ChiefTipComponent implements OnChanges, OnInit {
  @Input() edition = false;
  @Input() query = '';
  @Input() tip = '';
  @Output() chiefTipUpdated = new EventEmitter<string>();
  @ViewChild('chiefTipInput', {static: false}) private chiefTipInput: ElementRef<HTMLInputElement>;
  tipDisplayed = '';
  tipEdited = '';

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(){
    this.chiefTipInput.nativeElement.value = `${this.tip}`;
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes && (changes.tip || changes.query)){
      this.tipDisplayed = `${this.tip}`;
      if (this.chiefTipInput){
        this.chiefTipInput.nativeElement.value = `${this.tip}`;
      }
      if (this.query.length > 2){
        this.tipDisplayed = this.tipDisplayed.replace(new RegExp(`(${this.query})`, 'gi'), '<mark>$1</mark>');
      }
      this.cdRef.detectChanges();
    }
  }

  // update the tip value with the tipEdited
  updateTip(){
    // update locally
    this.tip = `${this.chiefTipInput.nativeElement.value}`;
    // update database
    this.chiefTipUpdated.emit(this.tip);
  }

}
