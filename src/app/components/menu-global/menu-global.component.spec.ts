import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGlobalComponent } from './menu-global.component';

describe('MenuGlobalComponent', () => {
  let component: MenuGlobalComponent;
  let fixture: ComponentFixture<MenuGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGlobalComponent);
    component = fixture.componentInstance;
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
    component.inShopping = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
