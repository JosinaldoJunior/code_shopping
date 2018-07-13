import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../../../model';
import { ProductHttpService } from '../../../../services/http/product-http.service';

@Component({
  selector: 'product-view-modal',
  templateUrl: './product-view-modal.component.html',
  styleUrls: ['./product-view-modal.component.css']
})
export class ProductViewModalComponent implements OnInit {

    product: Product = {
            name: '',
            description: '',
            price: 0, //number Html5
            active: true
    };
    
    @Input()
    _productId: number;
    
    //Events
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
                .subscribe(product => {
                    console.log(product);
                    this.product = product
                    });
        }
    }
    
    showModal(){
        this.modal.show();
    }
    
    hideModal($event: Event){
        //Fazer algo quando o modal for fechado
        console.log($event);
    }
}
