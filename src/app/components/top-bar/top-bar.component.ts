import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  @Input() category: string;
  @Input() query = '';
  @Output() categorySelected = new EventEmitter<any>();
  @Output() searched = new EventEmitter<any>();

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

  search(data){
    this.searched.emit(data);
  }

  select(item){
    this.categorySelected.emit(item.actionKey);
  }

}
