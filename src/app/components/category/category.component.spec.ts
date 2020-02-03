import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';

// run only this tests : ng test --include app\components\category\category.component.spec.ts

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.edition).toBe(false);
    expect(component.category).toBe("plat");
  });

  it('should category component span has or not edition class', () => {
    component.edition = false;
    fixture.detectChanges();
    const spanElement = fixture.debugElement.nativeElement.querySelector("span");
    expect(spanElement.className).toBe("");
    component.edition = true;
    fixture.detectChanges();
    expect(spanElement.className).toBe("edition");
  })

  it('should category is the good one when use after', () => {
    const imgElement = fixture.debugElement.nativeElement.querySelector("img");
    const divElement = fixture.debugElement.nativeElement.querySelector("span div");
    spyOn(component.categoryUpdated, 'emit'); // to check that the output is called
    component.after();
    fixture.detectChanges();
    expect(component.category).toBe("dessert");
    expect(imgElement.src).toContain("assets/img/dessert.png");
    expect(divElement.innerHTML).toContain("dessert");
    expect(component.categoryUpdated.emit).toHaveBeenCalledWith("dessert"); // to check that the output is called
    component.after();
    fixture.detectChanges();
    expect(component.category).toBe("boisson");
    expect(imgElement.src).toContain("assets/img/boisson.png");
    expect(divElement.innerHTML).toContain("boisson");
    expect(component.categoryUpdated.emit).toHaveBeenCalledWith("boisson"); // to check that the output is called
    component.after();
    fixture.detectChanges();
    expect(component.category).toBe("autre");
    expect(imgElement.src).toContain("assets/img/autre.png");
    expect(divElement.innerHTML).toContain("autre");
    expect(component.categoryUpdated.emit).toHaveBeenCalledWith("autre"); // to check that the output is called
    component.after();
    fixture.detectChanges();
    expect(component.category).toBe("aperitif");
    expect(imgElement.src).toContain("assets/img/aperitif.png");
    expect(divElement.innerHTML).toContain("aperitif");
    expect(component.categoryUpdated.emit).toHaveBeenCalledWith("aperitif"); // to check that the output is called
    component.after();
    fixture.detectChanges();
    expect(component.category).toBe("entree");
    expect(imgElement.src).toContain("assets/img/entree.png");
    expect(divElement.innerHTML).toContain("entree");
    expect(component.categoryUpdated.emit).toHaveBeenCalledWith("entree"); // to check that the output is called
    component.after();
    fixture.detectChanges();
    expect(component.category).toBe("plat");
    expect(imgElement.src).toContain("assets/img/plat.png");
    expect(divElement.innerHTML).toContain("plat");
    expect(component.categoryUpdated.emit).toHaveBeenCalledWith("plat"); // to check that the output is called
  });

  it('should category is the good one when use before', () => {
    const imgElement = fixture.debugElement.nativeElement.querySelector("img");
    const divElement = fixture.debugElement.nativeElement.querySelector("span div");
    spyOn(component.categoryUpdated, 'emit'); // to check that the output is called
    component.before();
    fixture.detectChanges();
    expect(component.category).toBe("entree");
    expect(imgElement.src).toContain("assets/img/entree.png");
    expect(divElement.innerHTML).toContain("entree");
    expect(component.categoryUpdated.emit).toHaveBeenCalledWith("entree"); // to check that the output is called
    component.before();
    fixture.detectChanges();
    expect(component.category).toBe("aperitif");
    expect(imgElement.src).toContain("assets/img/aperitif.png");
    expect(divElement.innerHTML).toContain("aperitif");
    expect(component.categoryUpdated.emit).toHaveBeenCalledWith("aperitif"); // to check that the output is called
    component.before();
    fixture.detectChanges();
    expect(component.category).toBe("autre");
    expect(imgElement.src).toContain("assets/img/autre.png");
    expect(divElement.innerHTML).toContain("autre");
    expect(component.categoryUpdated.emit).toHaveBeenCalledWith("autre"); // to check that the output is called
    component.before();
    fixture.detectChanges();
    expect(component.category).toBe("boisson");
    expect(imgElement.src).toContain("assets/img/boisson.png");
    expect(divElement.innerHTML).toContain("boisson");
    expect(component.categoryUpdated.emit).toHaveBeenCalledWith("boisson"); // to check that the output is called
    component.before();
    fixture.detectChanges();
    expect(component.category).toBe("dessert");
    expect(imgElement.src).toContain("assets/img/dessert.png");
    expect(divElement.innerHTML).toContain("dessert");
    expect(component.categoryUpdated.emit).toHaveBeenCalledWith("dessert"); // to check that the output is called
    component.before();
    fixture.detectChanges();
    expect(component.category).toBe("plat");
    expect(imgElement.src).toContain("assets/img/plat.png");
    expect(divElement.innerHTML).toContain("plat");
    expect(component.categoryUpdated.emit).toHaveBeenCalledWith("plat"); // to check that the output is called
  });
});
