import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() items: Array<any>
  @Input() user: User
  @Output() commentToBeDeleted = new EventEmitter<number>();
  @Output() commentToBeUpdated = new EventEmitter<any>();
  @Output() commentCreated = new EventEmitter<any>();
  emojiOpen = false;
  textContent = "";

  constructor() { }

  addEmoji = (data) => { this.textContent = `${this.textContent} ${data.emoji.native}` }

  createNewComment = () => {
    // create the new comment
    let newComment = {
      text: `${this.textContent}`,
      author: this.user._id
    }
    // add it to the comments
    this.items.push(newComment);
    // emit an event to record in database
    this.commentCreated.emit(newComment);
    // reset the textContent value and close the emojis
    this.textContent = "";
    this.emojiOpen = false;
  }

  deleteComment = (commentDate: any) => { this.commentToBeDeleted.emit(commentDate) }

  getDate = (item) => new Date(item.postedAt).toLocaleString('fr-FR');

  toggleEmojiPicker = () => { this.emojiOpen = !this.emojiOpen }

  updateComment = (data) => { this.commentToBeUpdated.emit(data) }
}
