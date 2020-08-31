import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'useraser',
  templateUrl: './useraser.component.html',
  styleUrls: ['./useraser.component.scss']
})
export class UseraserComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  @Input() users: Array<any>;

  delete(userId){
    const proceed = confirm(`Are you sure you want to delete ${userId} ?`);
    if (proceed) {
      this.usersService.deletetUser(userId).subscribe();
    }
  }

}
