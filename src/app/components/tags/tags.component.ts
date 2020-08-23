import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnChanges {
  @Input() items: Array<any>;
  @Input() edition: boolean;
  @Input() query: string;
  @Output() tagsUpdated = new EventEmitter<any>();
  itemsTransformed: Array<any> = [];
  itemsToSave: Array<any> = [];
  @ViewChild('newTag', {static: false}) private newTag: ElementRef<HTMLInputElement>;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges){
    this.itemsToSave = (changes && changes.items) ? this.items.map((i) => i) : this.itemsToSave;
    this.query = (changes && changes.query) ? changes.query.currentValue : this.query;
    this.transformItems();

    this.cdRef.detectChanges();
  }

  addTag(){
    if (this.newTag.nativeElement.value !== ''){
      this.itemsToSave.push(this.newTag.nativeElement.value);
      this.transformItems();
      // clear input
      this.newTag.nativeElement.value = '';
      this.updateTags();
    }
  }

  deleteTag(tagIndex: number){
    this.itemsToSave.splice(tagIndex, 1); // remove the ith element of items
    this.transformItems();
    this.updateTags();
  }

  transformItems(){
    this.itemsTransformed = this.itemsToSave.map((i) => {
      if (this.query.length > 2) {
        let tagTransformed = `${i}`;
        tagTransformed = i.replace(new RegExp(`(${this.query})`, 'gi'), '<mark>$1</mark>');
        return tagTransformed;
      }
      return i;
    });
  }

  updateTag = (data) => {
    this.itemsToSave[data.index] = data.text;
    this.transformItems();
    this.updateTags();
  }

  updateTags = () => {
    this.tagsUpdated.emit(this.itemsToSave);
  }
}
