import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../../model';
import { UserHttpService } from '../../../../services/http/user-http.service';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import fieldsOptions from '../user-form/user-fields-options';

@Component({
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

    form: FormGroup;
    errors = {};
    
    @Input()
    _userId: number;
    
    //Events
    @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
    
    @ViewChild(ModalComponent)
    modal: ModalComponent; 
    
    constructor(private userHttp: UserHttpService,
                private formBuilder: FormBuilder) { 
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(fieldsOptions.password.validationMessage.minlength)]],
        });
    }

    ngOnInit() {
    }
    
    @Input()
    set userId(value){
        this._userId = value;
        
        if(this._userId){
            this.userHttp.get(this._userId)
                .subscribe(user => this.form.patchValue(user),
                    responseError => {
                        if(responseError.status == 401){
                            this.modal.hide();
                        }
                    }
                );
        }
    }
    
    submit(){
        this.userHttp.update(this._userId, this.form.value)
        .subscribe((user) => {
            this.form.reset({
                name: '',
                email: '',
                password: ''
            });
            this.onSucess.emit(user);
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
    
    hideModal($event: Event){
        //Fazer algo quando o modal for fechado
        console.log($event);
    }

    showErrors(){
        return Object.keys(this.errors).length != 0;
    }

}
