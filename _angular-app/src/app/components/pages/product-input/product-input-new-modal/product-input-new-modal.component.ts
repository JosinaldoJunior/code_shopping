import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductInputHttpService } from '../../../../services/http/product-input-http.service';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import fieldsOptions from '../product-input-form/product-input-fields-options';

@Component({
  selector: 'product-input-new-modal',
  templateUrl: './product-input-new-modal.component.html',
  styleUrls: ['./product-input-new-modal.component.css']
})
export class ProductInputNewModalComponent implements OnInit {
    form: FormGroup;
    errors = {};
    
    @ViewChild(ModalComponent) modal: ModalComponent;  
    
    //Events
    @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
      
    constructor(public productInputHttp: ProductInputHttpService , private formBuilder: FormBuilder ) {
//        const maxlength = fieldsOptions.name.validationMessage.maxlength;
        this.form = this.formBuilder.group({
    //        name: ['', [Validators.required, Validators.maxLength(maxlength)]],
            amount: [''],
        });
    }
    
    ngOnInit() {
    }
    
    submit(){
        this.productInputHttp.create(this.form.value)
            .subscribe((category) => {
                this.form.reset({
                    name: '',
                    active: true
                });
                this.onSucess.emit(category);
                this.modal.hide();
                //this.getCategories();
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
