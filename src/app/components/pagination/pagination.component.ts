import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges{
  @Input() currentPage: number;
  @Input() totalPages: number;
  @Output() goToPage = new EventEmitter<number>();
  @ViewChild('firstPageElement', {static: false}) private firstPageElement: ElementRef<HTMLInputElement>;
  edition = false;
  newCurrentPage = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentPage){
      this.newCurrentPage = changes.currentPage.currentValue;
    }
  }

  goFirstPage = () => this.goToPage.emit(1);

  goLastPage = () => this.goToPage.emit(this.totalPages);

  goTo = () => {
    this.toggleGoto();
    if (this.newCurrentPage < 1){
      this.newCurrentPage = 1;
    }
    if (this.newCurrentPage > this.totalPages){
      this.newCurrentPage = this.totalPages;
    }
    this.goToPage.emit(this.newCurrentPage);
  }

  nextPage = () => {
    if (this.currentPage === this.totalPages){
      return;
    }
    this.goToPage.emit(this.currentPage + 1);
  }

  previousPage = () => {
    if (this.currentPage === 1){
      return;
    }
    this.goToPage.emit(this.currentPage - 1);
  }

  toggleGoto = () => {
    this.edition = !this.edition;
    setTimeout(() => {
      this.firstPageElement.nativeElement.select();
      this.firstPageElement.nativeElement.focus();
    }, 0);
  }
}
