import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../../../model';
import { ProductHttpService } from '../../../../services/http/product-http.service';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

    product: Product = {
            name: '',
            active: true
    };
    
    @Input()
    _productId: number;
    
    //Events
    @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
    
    @ViewChild(ModalComponent)
    modal: ModalComponent; 
    
    constructor(private productHttp: ProductHttpService) { }

    ngOnInit() {
    }
    
    @Input()
    set categoryId(value){
        this._productId = value;
        if(this._productId){
            this.productHttp.get(this._productId)
                .subscribe(product => this.product = product);
        }
    }
    
    submit(){
        this.productHttp.update(this._productId, this.product)
            .subscribe((product) => {
                this.onSucess.emit(product);
                this.modal.hide();
                //this.getCategories();
            }, error => this.onError.emit(error));
    }
    
    showModal(){
        this.modal.show();
    }
    
    hideModal($event: Event){
        //Fazer algo quando o modal for fechado
        console.log($event);
    }
}
