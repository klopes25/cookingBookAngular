import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoWithDurationComponent } from './photo-with-duration.component';

describe('PhotoWithDurationComponent', () => {
  let component: PhotoWithDurationComponent;
  let fixture: ComponentFixture<PhotoWithDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoWithDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoWithDurationComponent);
    component = fixture.componentInstance;
    component.preparationTime = '5 min';
    component.cookingTime = '5 min';
    component.restPeriod = '0 min';
    component.nbPerson = 2;
    component.nbPersonUnit = 'Pers.';
    component.edition = false;
    component.id = 1;
    component.recipeTitle = 'La recette de toto';
    component.deltaPerson = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
