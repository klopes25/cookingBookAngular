import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnChanges {
  @Input() mark: number;
  @Input() nbMark: number;
  @Input() user: User;
  @Input() canVote: boolean;
  starRank: number = 0;
  @Output() recipeMarked = new EventEmitter<any>();

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges){
    if(changes && changes['mark'] && changes['nbMark']){
      this.starRank = (changes['mark'].currentValue > 0) ? (changes['mark'].currentValue / changes['nbMark'].currentValue) : 0;
      this.cdRef.detectChanges();
    }
  }

  addMark(event){
    this.canVote = false;
    this.recipeMarked.emit(Number(event.target.value));
  }

  // TODO : on devrait pouvoir editer sa note pour l'update

}
