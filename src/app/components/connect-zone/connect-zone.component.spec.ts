import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ConnectZoneComponent } from './connect-zone.component';

const dataMock = require('../../mocks/datas.json');

// run only this tests : ng test --include app\components\connect-zone\connect-zone.component.spec.ts

describe('ConnectZoneComponent', () => {
  let component: ConnectZoneComponent;
  let fixture: ComponentFixture<ConnectZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectZoneComponent);
    component = fixture.componentInstance;
    component.user = dataMock.user1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should connect if user is null', () => {
    component.user = null;
    fixture.detectChanges();
    spyOn(component.connected, 'emit'); // to check that the output is called
    let inputLogin = fixture.debugElement.query(By.css('div.login input'));
    inputLogin.nativeElement.value = "yo";

    let inputPassword = fixture.debugElement.query(By.css('div.password input'));
    inputPassword.nativeElement.value = "man";

    component.connection();
    expect(component.connected.emit).toHaveBeenCalledWith({login: "yo", password: "man"}); // to check that the output is called
  })

  it('should not connect if user is not null', () => {
    let inputLogin = fixture.debugElement.query(By.css('div.login input'));
    let inputPassword = fixture.debugElement.query(By.css('div.password input'));
    expect(inputLogin).toBeFalsy()
    expect(inputPassword).toBeFalsy();
  })

  it('should display whether a user is null or not', () => {
    expect(component.isUserConnected()).toBe(true);
    component.user = null;
    fixture.detectChanges();
    expect(component.isUserConnected()).toBe(false);
  })

  it('should give the good avatar path', () => {
    expect(component.getUserAvatarSrc()).toBe("assets/img/user/user_burger.svg");
    component.user.logo = "apple";
    fixture.detectChanges();
    expect(component.getUserAvatarSrc()).toBe("assets/img/user/user_apple.svg");
  })

  it('should open the user form', () => {
    spyOn(component.createUserOpened, 'emit'); // to check that the output is called
    component.openCreateUser();
    expect(component.createUserOpened.emit).toHaveBeenCalled(); // to check that the output is called
  })

  it('should open the helper', () => {
    spyOn(component.helperOpened, 'emit'); // to check that the output is called
    component.showHelper();
    expect(component.helperOpened.emit).toHaveBeenCalled(); // to check that the output is called
  })

  it('should open the user paramater form', () => {
    spyOn(component.createUserOpened, 'emit'); // to check that the output is called
    component.showUserParameter();
    expect(component.createUserOpened.emit).toHaveBeenCalled(); // to check that the output is called
  })

  it('should unconnect', () => {
    spyOn(component.unconnected, 'emit'); // to check that the output is called
    component.unconnect();
    expect(component.unconnected.emit).toHaveBeenCalled(); // to check that the output is called
  })
});
