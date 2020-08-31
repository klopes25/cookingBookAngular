import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  @Input() category: string;
  @Input() query = '';
  @Input() user: User;
  @Output() categorySelected = new EventEmitter<any>();
  @Output() searched = new EventEmitter<any>();
  @Output() modeAdminActivated = new EventEmitter();

  items: Array<any> = [{
    title: 'Apéros',
    actionKey: 'aperitif'
  }, {
    title: 'Entrées',
    actionKey: 'entree'
  }, {
    title: 'Plats',
    actionKey: 'plat'
  }, {
    title: 'Desserts',
    actionKey: 'dessert'
  }, {
    title: 'Boissons',
    actionKey: 'boisson'
  }, {
    title: 'Autres',
    actionKey: 'autre'
  }, {
    title: 'Tous',
    actionKey: 'all'
  }];

  constructor() { }

  admin(){
    this.modeAdminActivated.emit();
  }

  search(data){
    this.searched.emit(data);
  }

  select(item){
    this.categorySelected.emit(item.actionKey);
  }

}
