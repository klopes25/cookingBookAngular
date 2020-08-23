import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {
  @Input() open: boolean;
  @Output() helperClosed = new EventEmitter<any>();

  constructor() { }

  closeHelp = () => { this.helperClosed.emit(); };
}
