import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraserComponent } from './useraser.component';

describe('UseraserComponent', () => {
  let component: UseraserComponent;
  let fixture: ComponentFixture<UseraserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseraserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
