import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/model/user';
import { isNil } from 'lodash-es';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges {
  @Input() user: User | null;
  @Input() open: boolean;
  @Output() userFormClosed = new EventEmitter<any>();
  @Output() userUpdated = new EventEmitter<any>();
  newLogin = '';
  newPassword = '';
  newEmail = '';
  newAvatar = 'burger';

  avatars = ['aubergine', 'banane', 'biere', 'biscuit', 'brochette', 'burger', 'cafe', 'carotte', 'champagne', 'cherry', 'chocolat', 'citron', 'citrouille', 'cocktail', 'coco', 'croissant', 'donut', 'egg', 'fraise', 'fromage', 'gateau', 'glace', 'kiwi', 'mais', 'meat', 'myrtille', 'nutella', 'orange', 'pasteque', 'pepper', 'poire', 'poireaux', 'poulet', 'ramen', 'riz', 'salade', 'sandwish', 'sucette', 'sushi', 'taco', 'tarte', 'tomato'];

  constructor() { }

  ngOnChanges(changes: SimpleChanges){
    if (!isNil(changes.user)  && !isNil(changes.user.currentValue)){
      this.newLogin = changes.user.currentValue.login;
      this.newPassword = changes.user.currentValue.password;
      this.newEmail = changes.user.currentValue.email;
      this.newAvatar = changes.user.currentValue.logo;
    }
    if (!isNil(changes.user) && (changes.user.currentValue === null)){
      this.newLogin = '';
      this.newPassword = '';
      this.newEmail = '';
      this.newAvatar = 'burger';
    }
  }

  closeForm(){
    if (this.user === null){
      this.newLogin = '';
      this.newPassword = '';
      this.newEmail = '';
      this.newAvatar = 'burger';
    } else {
      this.newLogin = this.user.login;
      this.newPassword = this.user.password;
      this.newEmail = this.user.email;
      this.newAvatar = this.user.logo;
    }

    this.userFormClosed.emit();
  }

  changeAvatar(avatar){
    this.newAvatar = avatar;
  }

  getTitle(){
    return `${(this.user === null) ? 'Création de votre compte' : 'Mise à jour de votre compte'}`;
  }

  isSelectedAvatar(avatar){
    return (avatar === this.newAvatar ? 'selected' : '');
  }

  valideUser(){
    this.userUpdated.emit({login: this.newLogin, password: this.newPassword, email: this.newEmail, avatar: this.newAvatar});
  }

}
