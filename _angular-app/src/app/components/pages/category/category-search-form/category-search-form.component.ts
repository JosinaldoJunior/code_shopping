import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'category-search-form',
  templateUrl: './category-search-form.component.html',
  styleUrls: ['./category-search-form.component.css']
})
export class CategorySearchFormComponent implements OnInit {

  search = '';
  
  @Output()
  OnSearch: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }
  
  submit(){
      this.OnSearch.emit(this.search);
      return false;
  }

}
