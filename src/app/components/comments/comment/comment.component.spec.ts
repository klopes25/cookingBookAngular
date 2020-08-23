import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';

const dataMock = require('../../../mocks/datas.json');

// run only this tests : ng test --include app\components\comments\comment\comment.component.spec.ts

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;

    component.text = 'Toto en slip';
    component.date = new Date('1981-02-19T12:24:11').toLocaleString('fr-FR');
    component.index = 0;
    component.author = dataMock.user1._id;
    component.user = dataMock.user1;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the good class for the pencil button', () => {
    // case user === null
    component.user = null;
    fixture.detectChanges();
    expect(component.getPencilClass()).toBe('icon-pencil hidden');
    // case where user === author
    component.user = dataMock.user1;
    fixture.detectChanges();
    expect(component.getPencilClass()).toBe('icon-pencil');
    // case where user != author
    component.user = dataMock.user2;
    fixture.detectChanges();
    expect(component.getPencilClass() === 'icon-pencil hidden').toBeTrue();
  });

  it('should have the good class for the trash button', () => {
    // case user === null
    component.user = null;
    fixture.detectChanges();
    expect(component.getTrashClass() === 'icon-trash hidden').toBeTrue();
    // case where user === author
    component.user = dataMock.user1;
    fixture.detectChanges();
    expect(component.getTrashClass() === 'icon-trash').toBeTrue();
    // case where user === author
    component.user = dataMock.user2;
    fixture.detectChanges();
    expect(component.getTrashClass() === 'icon-trash hidden').toBeTrue();
  });

  it('should toggle correctly the edition mode', () => {
    component.editComment = false;
    component.toggleEdit();
    fixture.detectChanges();
    expect(component.editComment).toBeTrue();
    component.toggleEdit();
    fixture.detectChanges();
    expect(component.editComment).toBeFalse();
  });

  it('should delete comment emit the good event', () => {
    spyOn(component.commentToBeDeleted, 'emit'); // to check that the output is called
    component.deleteComment();
    expect(component.commentToBeDeleted.emit).toHaveBeenCalledWith(component.date); // to check that the output is called
  });

  it('should close edition mode', () => {
    spyOn(component.commentToBeUpdated, 'emit'); // to check that the output is called
    component.closeEdition('toto en slibar');
    fixture.detectChanges();
    expect(component.editComment).toBeFalse();
    expect(component.text).toBe('toto en slibar');
    expect(component.commentToBeUpdated.emit).toHaveBeenCalledWith({text: 'toto en slibar', date: '19/02/1981 à 12:24:11'});
  });
});
