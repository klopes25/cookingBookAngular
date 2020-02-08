import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'top-recipe',
  templateUrl: './top-recipe.component.html',
  styleUrls: ['./top-recipe.component.scss']
})
export class TopRecipeComponent implements OnChanges {
  @Input() titlerecipe: string;
  @Input() isvalidated: boolean;
  @Input() role: string;
  @Input() edition: boolean;
  @Input() query: string = "";
  titleSelected: string;
  titleTransformed: string;
  @Output() editionModeActivated = new EventEmitter<any>();
  @Output() titleToBeUpdated = new EventEmitter<string>();
  @ViewChild('title', {static: false}) private title: ElementRef<HTMLInputElement>;

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges){
    if(changes && changes['titlerecipe']){
      this.titleSelected = `${this.titlerecipe}`;
      if(this.query.length > 2) this.titleTransformed = changes['titlerecipe'].currentValue.replace(new RegExp(`(${this.query})`, 'gi'), '<mark>$1</mark>');
      else this.titleTransformed = `${this.titlerecipe}`;
      this.cdRef.detectChanges();
    }
  }

  editTitle(){
    this.titleToBeUpdated.emit(this.title.nativeElement.value);
  }

  toggleEditMode(){
    this.editionModeActivated.emit();
  }

}
