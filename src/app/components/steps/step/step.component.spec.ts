import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SanitizeHtmlPipe } from '../../../pipes/safe.pipe';

import { StepComponent } from './step.component';

describe('StepComponent', () => {
  let component: StepComponent;
  let fixture: ComponentFixture<StepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepComponent, SanitizeHtmlPipe ],
      providers: [SanitizeHtmlPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
