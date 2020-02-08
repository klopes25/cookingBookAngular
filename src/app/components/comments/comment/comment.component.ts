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
  textTransformed: string = "";
  editComment: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges){
    if(changes && (changes['text'])){
      this.textTransformed = `${this.text}`;
    }
  }

  closeEdition = (comment) => {
    this.editComment = false;
    this.text = comment;
    this.commentToBeUpdated.emit({text: this.text, date: this.date});
  };

  deleteComment = () => { this.commentToBeDeleted.emit(this.date) };

  getPencilClass = () => (this.user === null) ? 'icon-pencil hidden' : ((this.user['_id'] === this.author) ? 'icon-pencil' : 'icon-pencil hidden');

  getTrashClass = () => (this.user === null) ? 'icon-trash hidden' : ((this.user['_id'] === this.author) ? 'icon-trash' : 'icon-trash hidden');

  toggleEdit = () => { this.editComment = !this.editComment };

  // TODO : on devrait pouvoir quand on edit un commentaire avoir accès aux emojis
}
