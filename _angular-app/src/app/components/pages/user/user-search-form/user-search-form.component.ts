import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'user-search-form',
  templateUrl: './user-search-form.component.html',
  styleUrls: ['./user-search-form.component.css']
})
export class UserSearchFormComponent implements OnInit {

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
