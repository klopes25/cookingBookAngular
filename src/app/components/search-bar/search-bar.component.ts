import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() query: string;
  @Output() searched = new EventEmitter<any>();
  @ViewChild('queryElement', {static: false}) private queryElement: ElementRef<HTMLInputElement>;
  @ViewChild('ingredientsInElement', {static: false}) private ingredientsInElement: ElementRef<HTMLInputElement>;
  @ViewChild('ingredientsOutElement', {static: false}) private ingredientsOutElement: ElementRef<HTMLInputElement>;
  @ViewChild('caloryMaxElement', {static: false}) private caloryMaxElement: ElementRef<HTMLInputElement>;
  @ViewChild('dureeMaxElement', {static: false}) private dureeMaxElement: ElementRef<HTMLInputElement>;

  showDetails = false;

  constructor() { }

  raz(){
    this.ingredientsInElement.nativeElement.value = '';
    this.ingredientsOutElement.nativeElement.value = '';
    this.caloryMaxElement.nativeElement.value = '';
    this.dureeMaxElement.nativeElement.value = '';
    this.searchRecipes();
  }

  searchRecipes(){
    this.searched.emit({
      query: this.queryElement.nativeElement.value.split(' '),
      ingredientsIn: this.ingredientsInElement.nativeElement.value.split(';'),
      ingredientsOut: this.ingredientsOutElement.nativeElement.value.split(';'),
      caloryMax: this.caloryMaxElement.nativeElement.value,
      dureeMax: this.dureeMaxElement.nativeElement.value
    });
  }

  toggle(){
    this.showDetails = !this.showDetails;
  }

}
