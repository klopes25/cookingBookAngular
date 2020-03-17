import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent {
  @Input() text: string = "";
  @Input() index: number;
  @Input() edition: boolean = false;
  @Input() query: string = "";
  @Output() stepToBeDeleted = new EventEmitter<any>();
  @Output() stepToBeMoved = new EventEmitter<any>();
  @Output() stepToBeUpdated = new EventEmitter<any>();
  checked: boolean = false;
  textTransformed: string = "";

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges){
    this.query = (changes && changes['query']) ? changes['query'].currentValue : this.query;
    let queries = this.query.split(' ');
    let isMultiWords = queries.length > 1;
    if(isMultiWords){
      this.textTransformed = this.text;
      queries.forEach(q => {
        this.textTransformed = (q.length > 2) ? this.textTransformed.replace(new RegExp(`(${q})`, 'gi'), '<mark>$1</mark>') : this.textTransformed;
      });
    } else {
      this.textTransformed = (this.query.length > 2) ? this.text.replace(new RegExp(`(${this.query})`, 'gi'), '<mark>$1</mark>') : this.text;
    }
    this.cdRef.detectChanges();
  }

  deleteStep = () => { this.stepToBeDeleted.emit(this.index) };

  down = () => { this.stepToBeMoved.emit({ index: this.index, value: 1}) };

  maj = (e) => { this.stepToBeUpdated.emit({index: this.index, text: e.target.value}) };

  toggleCheck = () => { this.checked = !this.checked };

  up = () => { this.stepToBeMoved.emit({ index: this.index, value: -1}) };

}
