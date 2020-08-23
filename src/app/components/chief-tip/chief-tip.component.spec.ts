import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ChiefTipComponent } from './chief-tip.component';
import { SanitizeHtmlPipe } from '../../pipes/safe.pipe';

// run only this tests : ng test --include app\components\chief-tip\chief-tip.component.spec.ts

describe('ChiefTipComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiefTipComponent, SanitizeHtmlPipe, TestHostComponent ],
      providers: [SanitizeHtmlPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the good tip dislayed', () => {
    component.tip = 'toto en slip';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('div > div > div').innerText).toBe('toto en slip');
  });

  it('should highlight the part of the tip that corresponds to the query', () => {
    component.tip = 'toto en slip';
    component.query = 'to';
    fixture.detectChanges();
    let markElement = fixture.debugElement.nativeElement.querySelector('mark');
    expect(markElement).toBeFalsy();
    component.query = 'tot';
    fixture.detectChanges();
    markElement = fixture.debugElement.nativeElement.querySelector('mark');
    expect(markElement).toBeTruthy();
    expect(markElement.innerHTML).toContain('tot');
  });

  it('should replace the span by an input when edition mode activated', () => {
    component.tip = 'toto en slip';
    component.edition = true;
    const chiefTipElement = fixture.debugElement.query(By.directive(ChiefTipComponent)).componentInstance; // get the child component
    spyOn(chiefTipElement.chiefTipUpdated, 'emit'); // to check that the output is called
    fixture.detectChanges();
    const inputElement = fixture.debugElement.nativeElement.querySelector('input');
    expect(inputElement).toBeTruthy();
    expect(inputElement.value).toBe('toto en slip');
    chiefTipElement.updateTip();
    expect(chiefTipElement.chiefTipUpdated.emit).toHaveBeenCalledWith('toto en slip'); // to check that the output is called
  });
});

// Why ??? Because the chief-tip component use ngOnChange ... we need to wrap chief-tip in another component to update the params
@Component({
  template: `<chief-tip [tip]='tip' [edition]='edition' [query]='query'></chief-tip>`
})
class TestHostComponent {
  tip = '';
  edition = false;
  query = '';
}
