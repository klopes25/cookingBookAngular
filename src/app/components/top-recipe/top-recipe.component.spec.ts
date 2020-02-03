import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRecipeComponent } from './top-recipe.component';
import { SanitizeHtmlPipe } from '../../pipes/safe.pipe';

describe('TopRecipeComponent', () => {
  let component: TopRecipeComponent;
  let fixture: ComponentFixture<TopRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRecipeComponent, SanitizeHtmlPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRecipeComponent);
    component = fixture.componentInstance;
    component.edition = false;
    component.query = "";
    component.role = "user";
    component.isvalidated = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
