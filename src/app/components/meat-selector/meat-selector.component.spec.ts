import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatSelectorComponent } from './meat-selector.component';

describe('MeatSelectorComponent', () => {
  let component: MeatSelectorComponent;
  let fixture: ComponentFixture<MeatSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeatSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeatSelectorComponent);
    component = fixture.componentInstance;
    component.edition = false;
    component.meat = "porc";
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(component.meatSrc).toBe("../../../assets/img/stamp-porc.svg");
    expect(component).toBeTruthy();
  });
});
