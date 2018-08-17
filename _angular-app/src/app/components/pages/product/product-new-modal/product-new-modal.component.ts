import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../../../model';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { ProductHttpService } from '../../../../services/http/product-http.service';
import fieldsOptions from '../product-form/product-fields-options';

@Component({
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})

export class ProductNewModalComponent implements OnInit {
    form: FormGroup;
    errors = {};
    
    product: Product = {
            name: '',
            description: '',
            price: 0, //number Html5
            active: true
    };
    
    @ViewChild(ModalComponent)
    modal: ModalComponent;  
    
    //Events
    @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
      
    constructor(private productHttp: ProductHttpService,
                private formBuilder: FormBuilder) { 
        this.form = this.formBuilder.group({
            name: ['null', [Validators.required]],
            description: ['null', [Validators.required]],
            price: ['', [Validators.required, Validators.min(fieldsOptions.price.validationMessage.min)]],
        });
    }

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

    showErrors(){
        return Object.keys(this.errors).length != 0;
    }
}
