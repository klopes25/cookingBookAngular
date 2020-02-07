// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgModule } from '@angular/core';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
// SERVICES
import { RecipesService } from './service/recipes.service';
import { UsersService } from './service/users.service';
// COMPONENTS
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category/category.component';
import { ChiefTipComponent } from './components/chief-tip/chief-tip.component';
import { ConnectZoneComponent } from './components/connect-zone/connect-zone.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { CommentsComponent } from './components/comments/comments.component';
import { FiltersComponent } from './components/filters/filters.component';
import { HelpComponent } from './components/help/help.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { MeatSelectorComponent } from './components/meat-selector/meat-selector.component';
import { MenuGlobalComponent } from './components/menu-global/menu-global.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PhotoWithDurationComponent } from './components/photo-with-duration/photo-with-duration.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { SpiceComponent } from './components/spice/spice.component';
import { StarsComponent } from './components/stars/stars.component';
import { StepComponent } from './components/steps/step/step.component';
import { StepsComponent } from './components/steps/steps.component';
import { TagComponent } from './components/tags/tag/tag.component';
import { TagsComponent } from './components/tags/tags.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { TopRecipeComponent } from './components/top-recipe/top-recipe.component';
import { UserFormComponent } from './components/user-form/user-form.component';
// PIPES
import { SanitizeHtmlPipe } from './pipes/safe.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectZoneComponent,
    MenuGlobalComponent,
    FiltersComponent,
    TopBarComponent,
    RecipesComponent,
    PaginationComponent,
    RecipeComponent,
    NotificationComponent,
    HelpComponent,
    UserFormComponent,
    RecipeFormComponent,
    ShoppingListComponent,
    SearchBarComponent,
    RecipeItemComponent,
    TopRecipeComponent,
    StarsComponent,
    MeatSelectorComponent,
    SpiceComponent,
    PhotoWithDurationComponent,
    CategoryComponent,
    IngredientsComponent,
    StepsComponent,
    ChiefTipComponent,
    TagsComponent,
    CommentsComponent,
    SanitizeHtmlPipe,
    StepComponent,
    TagComponent,
    CommentComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LazyLoadImageModule,
    PickerModule
  ],
  providers: [RecipesService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
