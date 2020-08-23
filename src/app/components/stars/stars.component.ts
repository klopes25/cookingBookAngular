import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit, OnChanges {
  @Input() mark: number;
  @Input() nbMark: number;
  @Input() id: number;
  @Input() user: User | null;
  @Input() canVote: boolean;
  starRank = 0;
  markSelected = 0;
  @Output() recipeMarked = new EventEmitter<any>();

  constructor(private cdRef: ChangeDetectorRef) {}

   ngOnInit(){
    if (this.user !== null){
      const findMark = this.user.votedFor.find(v => v.id === this.id);
      if (findMark !== undefined) {
        this.markSelected = findMark.mark;
      }
    }
   }

  ngOnChanges(changes: SimpleChanges){
    if (changes && changes.mark && changes.nbMark){
      this.starRank = (changes.mark.currentValue > 0) ? (changes.mark.currentValue / changes.nbMark.currentValue) : 0;
      this.cdRef.detectChanges();
    }
    else if (changes && changes.mark){
      this.starRank = (changes.mark.currentValue > 0) ? (changes.mark.currentValue / this.nbMark) : 0;
      this.cdRef.detectChanges();
    }
  }

  addMark(event){
    this.recipeMarked.emit({mark: Number(event.target.value), isUpdate: !this.canVote, old: this.markSelected});
    this.canVote = false;
  }
}
