import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsComponent } from './stars.component';

const dataMock = require('../../mocks/datas.json');

describe('StarsComponent', () => {
  let component: StarsComponent;
  let fixture: ComponentFixture<StarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsComponent);
    component = fixture.componentInstance;
    component.mark = 10;
    component.nbMark = 3;
    component.id = 1;
    component.user = dataMock.user1;
    component.canVote = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
