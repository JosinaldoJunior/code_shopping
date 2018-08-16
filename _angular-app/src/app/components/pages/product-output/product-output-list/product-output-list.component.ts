import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { ProductOutputNewModalComponent } from '../product-output-new-modal/product-output-new-modal.component';
import { ProductOutputHttpService } from '../../../../services/http/product-output-http.service';
import { ProductOutputInsertService } from './product-output-insert.service';
import { ProductOutput } from '../../../../model';

@Component({
  selector: 'product-output-list',
  templateUrl: './product-output-list.component.html',
  styleUrls: ['./product-output-list.component.css']
})
export class ProductOutputListComponent implements OnInit {

    outputs: Array<ProductOutput> = [];

    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    }
    
    sortColumn = {column: 'created_at', sort: 'desc'};
    
    @ViewChild(ProductOutputNewModalComponent)
    outputNewModal: ProductOutputNewModalComponent;
    
    searchText: string;
    
    constructor(private productOutputHttp: ProductOutputHttpService, 
                protected productOutputInsertService: ProductOutputInsertService,
                ) { 
        this.productOutputInsertService.outputListComponent = this;
    }
    
    ngOnInit() {
        console.log('ngOnInit');
        this.getOutputs();
    }
    
    getOutputs(){
        this.productOutputHttp.list({
                page: this.pagination.page,
                sort: this.sortColumn.column === '' ? null : this.sortColumn,
                search: this.searchText
            })
            .subscribe(response => {
                console.log(response);
                //response.data[0].active = false;
                this.outputs = response.data;
                this.pagination.totalItems = response.meta.total;
                this.pagination.itemsPerPage = response.meta.per_page;
            })
    }
    
    pageChanged(page){
        this.pagination.page = page;
        this.getOutputs();
    }
    
    sort(sortColumn){
        this.getOutputs();
    }
    
    search(search){
        console.log(search);
        this.searchText = search;
        this.getOutputs();
    }

}
