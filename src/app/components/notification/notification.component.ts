import { Component, EventEmitter, OnChanges, Input, Output, SimpleChanges } from '@angular/core';

interface Notification{
  text: string,
  state: "info" | "success" | "warning" | "error" | "";
}

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnChanges {
  @Input() notifs: Array<Notification>;
  @Output() notifRemoved = new EventEmitter<any>();
  size = 35;

  constructor() { }

  ngOnChanges(changes: SimpleChanges){
    if(changes['notifs'].currentValue == undefined) return;
    this.size = changes['notifs'].currentValue.length * 35;
    document.documentElement.style.setProperty('--size', `${this.size}`); // to set a CSS variable
    window.setTimeout(() => { this.notifRemoved.emit() }, 5000)
  }

  getNotifsState(){
    if(this.notifs.length < 1) return "";
    else {
      if(this.notifs.filter((notif) => notif.state === "error").length > 0) return "error showNotif";
      if(this.notifs.filter((notif) => notif.state === "warning").length > 0) return "warning showNotif";
      if(this.notifs.filter((notif) => notif.state === "success").length > 0) return "success showNotif";
      return "info showNotif";
    }
  }

}
