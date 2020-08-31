import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent implements OnInit {

  @Input() title = "Top Tags";
  @Input() first = "";
  @Input() second = "";
  @Input() third = "";

  constructor() { }

  ngOnInit(): void {
  }

}
