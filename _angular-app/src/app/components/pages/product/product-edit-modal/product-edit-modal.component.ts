import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../../../model';
import { ProductHttpService } from '../../../../services/http/product-http.service';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import fieldsOptions from '../product-form/product-fields-options';

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

    form: FormGroup;
    errors = {};

    @Input()
    _productId: number;
    
    //Events
    @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
    
    @ViewChild(ModalComponent)
    modal: ModalComponent; 
    
    constructor(private productHttp: ProductHttpService,
                private formBuilder: FormBuilder) { 
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(fieldsOptions.price.validationMessage.min)]],
            active: true
        });
    }

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
    
    submit(){
        this.productHttp.update(this._productId, this.form.value)
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
    
    showErrors(){
        return Object.keys(this.errors).length != 0;
    }
}
