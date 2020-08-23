import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FiltersComponent } from './filters.component';

const dataMock = require('../../mocks/datas.json');

// run only this tests : ng test --include app\components\filters\filters.component.spec.ts

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;

    component.user = dataMock.user1;
    component.currentRecipe = {
      recipeID: 1,
      category: 'plat',
      title: 'test of recipe',
      prepPeriod: '10 min',
      cookPeriod: '2 h',
      restPeriod: '3 j',
      nbPeople: 2,
      nbPeopleUnit: 'Pers.',
      mark: 7,
      nbMark: 3,
      calories: 250,
      spicy: 2,
      meatClass: 'boeuf',
      chiefTrick: 'Aucune astuce !',
      comments: [], // {text: string, author: User, postedAt: Date}
      ingredients: [], // {ingredient: string, quantity: string, unit: string, index: number, group: string}
      steps: [], // {text: string, index: number}
      tags: ['toto', 'tata'],
      video: false,
      validatedBy: [], // users id
      deletedBy: [] // users id
    };

    component.filters = {
      onlyValidated: false,
      onlyNew: false,
      onlyDislike: false,
      hot: false,
      hotMin: 0,
      hotMax: 3,
      star: false,
      starMin: 0,
      starMax: 5
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add to cart the current recipe', () => {
    spyOn(component.addedToCart, 'emit'); // to check that the output is called
    component.addToCart();
    expect(component.addedToCart.emit).toHaveBeenCalled(); // to check that the output is called
  });

  it('should know if recipe is selected', () => {
    expect(component.isRecipeSelected()).toBeTrue();
    component.currentRecipe = null;
    expect(component.isRecipeSelected()).toBeFalse();
  });

  it('should know if user is connected', () => {
    expect(component.isUserConnected()).toBeTrue();
    component.user = null;
    expect(component.isUserConnected()).toBeFalse();
  });

  it('should filter the spices', () => {
    spyOn(component.filterChanged, 'emit'); // to check that the output is called
    expect(component.filters.hot).toBe(false);

    component.toggleHot();
    expect(component.filters.hot).toBe(true);
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: false,
      onlyNew: false,
      onlyDislike: false,
      hot: true,
      hotMin: 0,
      hotMax: 3,
      star: false,
      starMin: 0,
      starMax: 5
    }); // to check that the output is called

    component.toggleHot();
    expect(component.filters.hot).toBe(false);
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: false,
      onlyNew: false,
      onlyDislike: false,
      hot: false,
      hotMin: 0,
      hotMax: 3,
      star: false,
      starMin: 0,
      starMax: 5
    }); // to check that the output is called
  });

  it('should filter the disliked', () => {
    spyOn(component.filterChanged, 'emit'); // to check that the output is called
    expect(component.filters.onlyDislike).toBe(false);

    component.toggleOnlyDislike();
    expect(component.filters.onlyDislike).toBe(true);
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: false,
      onlyNew: false,
      onlyDislike: true,
      hot: false,
      hotMin: 0,
      hotMax: 3,
      star: false,
      starMin: 0,
      starMax: 5
    }); // to check that the output is called

    component.toggleOnlyDislike();
    expect(component.filters.onlyDislike).toBe(false);
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: false,
      onlyNew: false,
      onlyDislike: false,
      hot: false,
      hotMin: 0,
      hotMax: 3,
      star: false,
      starMin: 0,
      starMax: 5
    }); // to check that the output is called
  });

  it('should filter the new recipes', () => {
    spyOn(component.filterChanged, 'emit'); // to check that the output is called
    expect(component.filters.onlyNew).toBe(false);

    component.toggleOnlyNew();
    expect(component.filters.onlyNew).toBe(true);
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: false,
      onlyNew: true,
      onlyDislike: false,
      hot: false,
      hotMin: 0,
      hotMax: 3,
      star: false,
      starMin: 0,
      starMax: 5
    }); // to check that the output is called

    component.toggleOnlyNew();
    expect(component.filters.onlyNew).toBe(false);
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: false,
      onlyNew: false,
      onlyDislike: false,
      hot: false,
      hotMin: 0,
      hotMax: 3,
      star: false,
      starMin: 0,
      starMax: 5
    }); // to check that the output is called
  });

  it('should filter the validated recipes', () => {
    spyOn(component.filterChanged, 'emit'); // to check that the output is called
    expect(component.filters.onlyValidated).toBe(false);

    component.toggleOnlyValidated();
    expect(component.filters.onlyValidated).toBe(true);
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: true,
      onlyNew: false,
      onlyDislike: false,
      hot: false,
      hotMin: 0,
      hotMax: 3,
      star: false,
      starMin: 0,
      starMax: 5
    }); // to check that the output is called

    component.toggleOnlyValidated();
    expect(component.filters.onlyValidated).toBe(false);
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: false,
      onlyNew: false,
      onlyDislike: false,
      hot: false,
      hotMin: 0,
      hotMax: 3,
      star: false,
      starMin: 0,
      starMax: 5
    }); // to check that the output is called
  });

  it('should filter recipes by stars', () => {
    spyOn(component.filterChanged, 'emit'); // to check that the output is called
    expect(component.filters.star).toBeFalse();

    component.toggleStar();
    expect(component.filters.star).toBeTrue();
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: false,
      onlyNew: false,
      onlyDislike: false,
      hot: false,
      hotMin: 0,
      hotMax: 3,
      star: true,
      starMin: 0,
      starMax: 5
    }); // to check that the output is called

    component.toggleStar();
    expect(component.filters.star).toBeFalse();
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: false,
      onlyNew: false,
      onlyDislike: false,
      hot: false,
      hotMin: 0,
      hotMax: 3,
      star: false,
      starMin: 0,
      starMax: 5
    }); // to check that the output is called
  });

  it('should change min and max spices filters', () => {
    spyOn(component.filterChanged, 'emit'); // to check that the output is called
    expect(component.filters.hotMin).toBe(0);
    expect(component.filters.hotMax).toBe(3);

    component.currentRecipe = null;
    fixture.detectChanges();

    // min >= 0 && max <= 3 && min < max
    const inputMin = fixture.debugElement.query(By.css('.icon-extinguisher input.min'));
    inputMin.nativeElement.value = '1';
    const inputMax = fixture.debugElement.query(By.css('.icon-extinguisher input.max'));
    inputMax.nativeElement.value = '2';
    component.updateMinMaxHot();
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: false,
      onlyNew: false,
      onlyDislike: false,
      hot: true,
      hotMin: 1,
      hotMax: 2,
      star: false,
      starMin: 0,
      starMax: 5
    }); // to check that the output is called

    // min >= 0 && max <= 3 && min > max
    inputMin.nativeElement.value = '3';
    inputMax.nativeElement.value = '2';
    component.updateMinMaxHot();
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: false,
      onlyNew: false,
      onlyDislike: false,
      hot: true,
      hotMin: 3,
      hotMax: 3,
      star: false,
      starMin: 0,
      starMax: 5
    }); // to check that the output is called

  });

  it('should change min and max stars filters', () => {
    spyOn(component.filterChanged, 'emit'); // to check that the output is called
    expect(component.filters.starMin).toBe(0);
    expect(component.filters.starMax).toBe(5);

    component.currentRecipe = null;
    fixture.detectChanges();

    // min >= 0 && max <= 5 && min < max
    const inputMin = fixture.debugElement.query(By.css('.icon-star input.min'));
    inputMin.nativeElement.value = '1';
    const inputMax = fixture.debugElement.query(By.css('.icon-star input.max'));
    inputMax.nativeElement.value = '2';
    component.updateMinMaxStar();
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: false,
      onlyNew: false,
      onlyDislike: false,
      hot: false,
      hotMin: 0,
      hotMax: 3,
      star: true,
      starMin: 1,
      starMax: 2
    }); // to check that the output is called

    // min >= 0 && max <= 5 && min > max
    inputMin.nativeElement.value = '3';
    inputMax.nativeElement.value = '2';
    component.updateMinMaxStar();
    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      onlyValidated: false,
      onlyNew: false,
      onlyDislike: false,
      hot: false,
      hotMin: 0,
      hotMax: 3,
      star: true,
      starMin: 3,
      starMax: 3
    }); // to check that the output is called
  });

  it('should validate the current recipe', () => {
    spyOn(component.recipeValidated, 'emit'); // to check that the output is called
    component.validate();
    expect(component.recipeValidated.emit).toHaveBeenCalled(); // to check that the output is called
  });
});
