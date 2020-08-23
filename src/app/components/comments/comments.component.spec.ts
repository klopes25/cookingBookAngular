import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../src/model/user';

import { CommentsComponent } from './comments.component';

const dataMock = require('../../mocks/datas.json');

// run only this tests : ng test --include app\components\comments\comments.component.spec.ts

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CommentsComponent, MockCommentComponent, MockEmojiPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    component.textContent = 'toto en moto';
    component.user = dataMock.user2;
    component.items = [
      {
        text: 'Toto en slip',
        date: new Date('1981-02-19T12:24:11'),
        index: 0,
        author: dataMock.user1._id
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain emoji picker component', () => {
    const mockTaskEl = fixture.debugElement.query(By.directive(MockEmojiPickerComponent));
    expect(mockTaskEl).toBeTruthy();
  });

  it('should toggle correctly the edition mode', () => {
    component.emojiOpen = false;
    component.toggleEmojiPicker();
    fixture.detectChanges();
    expect(component.emojiOpen).toBeTrue();
    component.toggleEmojiPicker();
    fixture.detectChanges();
    expect(component.emojiOpen).toBeFalse();
   });

  it('should update comment emit the good event', () => {
    spyOn(component.commentToBeUpdated, 'emit'); // to check that the output is called
    component.updateComment('totolitoto');
    expect(component.commentToBeUpdated.emit).toHaveBeenCalledWith('totolitoto'); // to check that the output is called
  });

  it('should delete comment emit the good event', () => {
    spyOn(component.commentToBeDeleted, 'emit'); // to check that the output is called
    component.deleteComment(12);
    expect(component.commentToBeDeleted.emit).toHaveBeenCalledWith(12); // to check that the output is called
  });

  it('should have the good behavior for getDate', () => {
    const item = {
      text: 'Toto en slip',
      postedAt: new Date('1981-02-19T12:24:11'),
      index: 0,
      author: dataMock.user1._id
    };
    expect(component.getDate(item)).toBe('19/02/1981 à 12:24:11');
  });

  it('should create a new comment', () => {
    spyOn(component.commentCreated, 'emit'); // to check that the output is called
    component.textContent = 'Ah!Ah!Ah! Good joke';
    fixture.detectChanges();
    component.createNewComment();
    fixture.detectChanges();

    expect(component.items[1]).toEqual({
      text: 'Ah!Ah!Ah! Good joke',
      author: dataMock.user2._id
    });

    // to check that the output is called
    expect(component.commentCreated.emit).toHaveBeenCalledWith({ text: 'Ah!Ah!Ah! Good joke', author: '@toto' });

    expect(component.textContent).toBe('');
    expect(component.emojiOpen).toBeFalse();
  });

  it('should add emoji', () => {
    component.addEmoji({emoji: { native: 'yo' } });
    fixture.detectChanges();
    expect(component.textContent).toBe('toto en moto yo'); // to check that the output is called
  });
});

////////////////////////////////// MOCKS //////////////////////////////////

// Fake the emoji (a sub-component)
@Directive({
  selector: 'emoji-mart'
})
class MockEmojiPickerComponent {
  @Input() exclude: Array<string>;
  @Input() title: string;
  @Input() emojiTooltip: boolean;
  @Output() clickEmitter = new EventEmitter<void>();
}

// Fake the comment (a sub-component)
@Directive({
  selector: 'comment'
})
class MockCommentComponent {
  @Input() text: string;
  @Input() date: string;
  @Input() index: number;
  @Input() author: User;
  @Input() user: User;
  @Output() commentToBeDeleted = new EventEmitter<any>();
  @Output() commentToBeUpdated = new EventEmitter<any>();
}
