import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent {
  @Input() text: string = "";
  @Input() index: number;
  @Input() edition: boolean = false;
  @Output() stepToBeDeleted = new EventEmitter<any>();
  @Output() stepToBeMoved = new EventEmitter<any>();
  checked:boolean = false;

  constructor() { }

  deleteStep = () => { this.stepToBeDeleted.emit(this.index) };

  down = () => { this.stepToBeMoved.emit({ index: this.index, value: 1}) };

  toggleCheck = () => { this.checked = !this.checked };

  up = () => { this.stepToBeMoved.emit({ index: this.index, value: -1}) };

}
