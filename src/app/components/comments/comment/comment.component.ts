import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnChanges {
  @Input() text: string;
  @Input() date: string;
  @Input() index: number;
  @Input() author: string;
  @Input() user: User | null;
  @Output() commentToBeDeleted = new EventEmitter<any>();
  @Output() commentToBeUpdated = new EventEmitter<any>();
  textTransformed = '';
  editComment = false;
  pencilClass = 'icon-pencil hidden';
  trashClass = 'icon-trash hidden';

  constructor() { }

  ngOnChanges(changes: SimpleChanges){
    if (changes && (changes.text)){
      this.textTransformed = `${this.text}`;
    }
    if (changes && (changes.user)){
      this.pencilClass = (changes.user.currentValue === null) ? 'icon-pencil hidden' : ((changes.user.currentValue._id === this.author) ? 'icon-pencil' : 'icon-pencil hidden');
      this.trashClass = (changes.user.currentValue === null) ? 'icon-trash hidden' : ((changes.user.currentValue._id === this.author) ? 'icon-trash' : 'icon-trash hidden');
    }
  }

  closeEdition = (comment) => {
    this.editComment = false;
    this.text = comment;
    this.commentToBeUpdated.emit({text: this.text, date: this.date});
  }

  deleteComment = () => { this.commentToBeDeleted.emit(this.date); };

  toggleEdit = () => { this.editComment = !this.editComment; };

  // TODO : on devrait pouvoir quand on edit un commentaire avoir accès aux emojis
}
