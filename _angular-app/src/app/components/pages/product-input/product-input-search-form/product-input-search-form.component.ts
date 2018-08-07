import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'product-input-search-form',
  templateUrl: './product-input-search-form.component.html',
  styleUrls: ['./product-input-search-form.component.css']
})
export class ProductInputSearchFormComponent implements OnInit {

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
