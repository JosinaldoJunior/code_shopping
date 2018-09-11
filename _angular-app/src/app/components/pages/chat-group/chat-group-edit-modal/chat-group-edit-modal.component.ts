import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatGroup } from '../../../../model';
import { ChatGroupHttpService } from '../../../../services/http/chat-group-http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import fieldsOptions from '../chat-group-form/chat-group-fields-options';

@Component({
  selector: 'chat-group-edit-modal',
  templateUrl: './chat-group-edit-modal.component.html',
  styleUrls: ['./chat-group-edit-modal.component.css']
})
export class ChatGroupEditModalComponent implements OnInit {

    @Input()
    _chatGroupId: number;
    chatGroup: ChatGroup;
    form: FormGroup;
    errors = {};
    
    //Events
    @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
    
    @ViewChild(ModalComponent)
    modal: ModalComponent; 
    
    constructor(private chatGroupHttp: ChatGroupHttpService, private formBuilder: FormBuilder) { 
        const maxlength = fieldsOptions.name.validationMessage.maxlength;
        const minlength = fieldsOptions.name.validationMessage.minlength;
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(maxlength), Validators.minLength(minlength)]],
            photo: null
        });
    }

    ngOnInit() {
    }
    
    @Input()
    set chatGroupId(value){
        this._chatGroupId = value;
        if(this._chatGroupId){
            this.chatGroupHttp.get(this._chatGroupId)
                .subscribe(
                    chatGroup => this.form.patchValue(chatGroup), 
                    responseError => {
                        if(responseError.status == 401){
                            this.modal.hide();
                        }
                    }
                )
        }
    }
    
    submit(){
        this.chatGroupHttp.update(this._chatGroupId, this.form.value)
            .subscribe((chatGroup) => {
                this.onSucess.emit(chatGroup);
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
