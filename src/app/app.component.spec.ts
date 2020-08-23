import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, Input } from '@angular/core';
// components
import { CategoryComponent } from './components/category/category.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { CommentsComponent } from './components/comments/comments.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { MeatSelectorComponent } from './components/meat-selector/meat-selector.component';
import { PhotoWithDurationComponent } from './components/photo-with-duration/photo-with-duration.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { SpiceComponent } from './components/spice/spice.component';
import { StarsComponent } from './components/stars/stars.component';
import { StepComponent } from './components/steps/step/step.component';
import { StepsComponent } from './components/steps/steps.component';
import { TagComponent } from './components/tags/tag/tag.component';
import { TagsComponent } from './components/tags/tags.component';
import { TopRecipeComponent } from './components/top-recipe/top-recipe.component';
// pipe
import { SanitizeHtmlPipe } from './pipes/safe.pipe';
// mock component
@Component({
  selector: 'chief-tip',
  template: '<p>Mock Product Settings Component</p>'
})
class MockChiefTipComponent {
  @Input() tip;
  @Input() edition: boolean;
  @Input() query: string;
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, RecipeComponent, TopRecipeComponent, StarsComponent, MeatSelectorComponent, SpiceComponent,
        PhotoWithDurationComponent, CategoryComponent, IngredientsComponent, StepsComponent, StepComponent,
        MockChiefTipComponent, TagsComponent, TagComponent, CommentsComponent, CommentComponent, SanitizeHtmlPipe ],
      providers: [SanitizeHtmlPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    component.currentCategory = 'all';
    component.currentPage = 1;
    component.currentRecipe = null;
    component.deltaPerson = 0;
    component.editionMode = false;
    component.inShopping = false;
    component.notifs = [];
    component.openHelp = false;
    component.openRecipeForm = false;
    component.openShoppingList = false;
    component.openUserForm = false;
    component.query = '';
    component.shoppingItems = [];
    component.totalPages = 1;
    component.user = {
      _id: '12',
      email: 'a@b.fr',
      login: 'funny',
      logo: 'burger',
      password: '***',
      role: 'admin',
      votedFor: [],
      cart: []
    };

    fixture.detectChanges();
  });

  /*
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.foot span').textContent).toContain('© The Funnybobby company 2019');
  });
  */
});
