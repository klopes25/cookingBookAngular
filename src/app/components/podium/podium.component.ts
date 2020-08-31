import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent implements OnInit {

  @Input() title = "Top Tags";

  constructor() { }

  ngOnInit(): void {
  }

}
