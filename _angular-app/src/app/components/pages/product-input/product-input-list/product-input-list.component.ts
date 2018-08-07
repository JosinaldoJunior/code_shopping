import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { ProductInputNewModalComponent } from '../product-input-new-modal/product-input-new-modal.component';
import { ProductInputHttpService } from '../../../../services/http/product-input-http.service';
import { ProductInputInsertService } from './product-input-insert.service';
import { ProductInput } from '../../../../model';

@Component({
  selector: 'product-input-list',
  templateUrl: './product-input-list.component.html',
  styleUrls: ['./product-input-list.component.css']
})

export class ProductInputListComponent implements OnInit {

    inputs: Array<ProductInput> = [];

    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    }
    
    sortColumn = {column: 'created_at', sort: 'desc'};
    
    @ViewChild(ProductInputNewModalComponent)
    inputNewModal: ProductInputNewModalComponent;
    
    searchText: string;
    
    constructor(private productInputHttp: ProductInputHttpService, 
                protected productInputInsertService: ProductInputInsertService,
                ) { 
        this.productInputInsertService.inputListComponent = this;
    }
    
    ngOnInit() {
        console.log('ngOnInit');
        this.getInputs();
    }
    
    getInputs(){
        this.productInputHttp.list({
                page: this.pagination.page,
                sort: this.sortColumn.column === '' ? null : this.sortColumn,
                search: this.searchText
            })
            .subscribe(response => {
                console.log(response);
                //response.data[0].active = false;
                this.inputs = response.data;
                this.pagination.totalItems = response.meta.total;
                this.pagination.itemsPerPage = response.meta.per_page;
            })
    }
    
    pageChanged(page){
        this.pagination.page = page;
        this.getInputs();
    }
    
    sort(sortColumn){
        this.getInputs();
    }
    
    search(search){
        console.log(search);
        this.searchText = search;
        this.getInputs();
    }

}
