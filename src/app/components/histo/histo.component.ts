import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'histo',
  templateUrl: './histo.component.html',
  styleUrls: ['./histo.component.scss']
})
export class HistoComponent implements OnInit {

  @Input() title = " Recipes";
  @Input() labels = ['Apéritifs', 'Entrées', 'Plats', 'Desserts', 'Boissons', 'Autres'];
  @Input() values = [45,152, 812, 452, 12, 24];

  data = [{
    data: [],
    label: 'Nb Recipes',
    fillColor: "rgba(220,220,220,0.5)", 
    strokeColor: "rgba(220,220,220,0.5)", 
    highlightFill: "rgba(220,220,220,0.5)",
    highlightStroke: "rgba(220,220,220,0.5)"
  }];

  options: ChartOptions = {
    responsive: true
  };

  type: ChartType = 'bar';
  plugins = [];
  colors = [
    { backgroundColor: ['#9ed26a', '#ac92ea', '#4a88da', '#f5b945', '#d56fac', '#fa6c51'] },
  ];

  constructor() { }

  ngOnInit(): void {
    this.data[0].data = this.values;
  }

}
