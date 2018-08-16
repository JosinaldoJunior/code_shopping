import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductOutputHttpService } from '../../../../services/http/product-output-http.service';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import fieldsOptions from '../product-output-form/product-output-fields-options';

@Component({
  selector: 'product-output-new-modal',
  templateUrl: './product-output-new-modal.component.html',
  styleUrls: ['./product-output-new-modal.component.css']
})
export class ProductOutputNewModalComponent implements OnInit {

    form: FormGroup;
    errors = {};
    
    @ViewChild(ModalComponent) modal: ModalComponent;  
    
    //Events
    @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
      
    constructor(public productOutputHttp: ProductOutputHttpService , private formBuilder: FormBuilder ) {
        this.form = this.formBuilder.group({
            product_id: ['null', [Validators.required]],
            amount: ['', [Validators.required, Validators.min(fieldsOptions.amount.validationMessage.min)]],
        });
    }
    
    ngOnInit() {
    }
    
    submit(){
        this.productOutputHttp.create(this.form.value)
            .subscribe((input) => {
                this.form.reset({
                    amount: '',
                    product_id: null
                });
                this.onSucess.emit(input);
                this.modal.hide();
            }, responseError => {
                if(responseError.status === 422){
                    this.errors = responseError.error.errors;
                }
                
                this.onError.emit(responseError)
            });
    }

  showModal(){
      this.modal.show();
  }
  
  showErrors(){
      return Object.keys(this.errors).length != 0;
  }
  
  hideModal($event: Event){
      //Fazer algo quando o modal for fechado
      console.log($event);
  }
}
