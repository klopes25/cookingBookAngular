import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
// components
import { CategoryComponent } from '../category/category.component';
import { CommentComponent } from '../comments/comment/comment.component';
import { CommentsComponent } from '../comments/comments.component';
import { IngredientsComponent } from '../ingredients/ingredients.component';
import { MeatSelectorComponent } from '../meat-selector/meat-selector.component';
import { PhotoWithDurationComponent } from '../photo-with-duration/photo-with-duration.component';
import { RecipeComponent } from './recipe.component';
import { SpiceComponent } from '../spice/spice.component';
import { StarsComponent } from '../stars/stars.component';
import { StepComponent } from '../steps/step/step.component';
import { StepsComponent } from '../steps/steps.component';
import { TagComponent } from '../tags/tag/tag.component';
import { TagsComponent } from '../tags/tags.component';
import { TopRecipeComponent } from '../top-recipe/top-recipe.component';
// pipe
import { SanitizeHtmlPipe } from '../../pipes/safe.pipe';
// mock component
@Component({
  selector: 'chief-tip',
  template: '<p>Mock Product Settings Component</p>'
})
class MockChiefTipComponent {
  @Input() tip: string;
  @Input() edition: boolean;
  @Input() query: string;
}

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeComponent, TopRecipeComponent, StarsComponent, MeatSelectorComponent, SpiceComponent,
        PhotoWithDurationComponent, CategoryComponent, IngredientsComponent, StepsComponent, StepComponent,
        MockChiefTipComponent, TagsComponent, TagComponent, CommentsComponent, CommentComponent, SanitizeHtmlPipe ],
      providers: [SanitizeHtmlPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
    component.currentRecipe = {
      recipeID: 1,
      category: 'plat',
      title: 'Recipe title',
      prepPeriod: '1 min',
      cookPeriod: '2 min',
      restPeriod: '3 min',
      nbPeople: 2,
      nbPeopleUnit: 'Pers.',
      mark: 0,
      nbMark: 0,
      calories: 150,
      spicy: 1,
      meatClass: 'canard',
      chiefTrick: 'Aucune astuce !',
      comments: [],
      ingredients: [],
      steps: [ { text: 'Blabla', index: 1 }, { text: 'Babebibobu', index: 2 }],
      tags: ['aa', 'bb'],
      video: false,
      validatedBy: [],
      deletedBy: []
    };
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
    component.query = '';
    component.editionMode = false;
    component.deltaPerson = 0;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
