import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../../../model';
import { ProductHttpService } from '../../../../services/http/product-http.service';

@Component({
  selector: 'app-product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css']
})
export class ProductDeleteModalComponent implements OnInit {

    product: Product = null;

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
    set productId(value){
        this._productId = value;
        if(this._productId){
            this.productHttp.get(this._productId)
            .subscribe(product => this.product = product);
        }
    }
    
    destroy(){
        this.productHttp.destroy(this._productId)
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
