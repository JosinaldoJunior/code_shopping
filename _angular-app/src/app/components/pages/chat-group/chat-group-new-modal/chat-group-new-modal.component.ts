import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatGroupHttpService } from '../../../../services/http/chat-group-http.service';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import fieldsOptions from '../chat-group-form/chat-group-fields-options';

@Component({
  selector: 'chat-group-new-modal',
  templateUrl: './chat-group-new-modal.component.html',
  styleUrls: ['./chat-group-new-modal.component.css']
})

export class ChatGroupNewModalComponent implements OnInit {

    form: FormGroup;
    errors = {};

    @ViewChild(ModalComponent) modal: ModalComponent;  
    
    //Events
    @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
      
    constructor(public chatGroupHttp: ChatGroupHttpService , private formBuilder: FormBuilder ) {
        const maxlength = fieldsOptions.name.validationMessage.maxlength;
        const minlength = fieldsOptions.name.validationMessage.minlength;
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(maxlength), Validators.minLength(minlength)]],
            photo: [null, Validators.required]
        });
    }
    
    ngOnInit() {
    }
    
    submit(){
        this.chatGroupHttp.create(this.form.value)
            .subscribe((category) => {
                this.form.reset({
                    name: '',
                    photo: null
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
