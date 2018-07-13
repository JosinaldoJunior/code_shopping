import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../../../model';
import { ProductHttpService } from '../../../../services/http/product-http.service';

@Component({
  selector: 'app-product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})

export class ProductNewModalComponent implements OnInit {

    product: Product = {
            name: '',
            active: true
    };
    
    @ViewChild(ModalComponent)
    modal: ModalComponent;  
    
    //Events
    @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
      
    constructor(private productHttp: ProductHttpService) { }

    ngOnInit() {
    }
    
    submit(){
        this.productHttp.create(this.product)
            .subscribe((product) => {
                this.onSucess.emit(product);
                this.modal.hide();
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
