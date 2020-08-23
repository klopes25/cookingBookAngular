import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnChanges {
  @Input() text: string;
  @Input() index: number;
  @Input() edition: boolean;
  @Input() query: string;
  @Output() tagToBeDeleted = new EventEmitter<number>();
  @Output() tagUpdated = new EventEmitter<any>();
  textTransformed = '';

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges){
    if (changes && (changes.text || changes.query)){
      this.textTransformed = (this.query.length > 2) ?
        this.text.replace(new RegExp(`(${this.query})`, 'gi'), '<mark>$1</mark>') : this.text;
      this.cdRef.detectChanges();
    }
  }

  deleteTag = () => {
    this.tagToBeDeleted.emit(this.index);
  }

  updateTag = (text) => {
    this.tagUpdated.emit({text, index: this.index});
  }

}
