import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'connect-zone',
  templateUrl: './connect-zone.component.html',
  styleUrls: ['./connect-zone.component.scss']
})
export class ConnectZoneComponent {
  @Input() user: User | null;
  @Output() connected = new EventEmitter<any>();
  @Output() createUserOpened = new EventEmitter<any>();
  @Output() helperOpened = new EventEmitter<any>();
  @Output() unconnected = new EventEmitter<any>();
  @ViewChild('login', {static: false}) private login: ElementRef<HTMLInputElement>;
  @ViewChild('password', {static: false}) private password: ElementRef<HTMLInputElement>;

  constructor() { }

  connection(){
    this.connected.emit({
      login: this.login.nativeElement.value,
      password: this.password.nativeElement.value
    });
  }

  openCreateUser = () => { this.createUserOpened.emit(); };

  showHelper = () => { this.helperOpened.emit(); };

  showUserParameter = () => { this.createUserOpened.emit(); };

  unconnect = () => { this.unconnected.emit(); };
}
