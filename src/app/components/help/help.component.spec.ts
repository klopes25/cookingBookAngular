import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpComponent } from './help.component';

// run only this tests : ng test --include app\components\help\help.component.spec.ts

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    component.open = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the helper', () => {
    spyOn(component.helperClosed, 'emit'); // to check that the output is called
    component.closeHelp();
    expect(component.helperClosed.emit).toHaveBeenCalled(); // to check that the output is called
  });
});
