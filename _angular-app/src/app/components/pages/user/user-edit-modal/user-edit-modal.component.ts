import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../../model';
import { UserHttpService } from '../../../../services/http/user-http.service';

@Component({
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

    user: User = {
            name: '',
            email: ''
    };
    
    @Input()
    _userId: number;
    
    //Events
    @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
    
    @ViewChild(ModalComponent)
    modal: ModalComponent; 
    
    constructor(private userHttp: UserHttpService) { }

    ngOnInit() {
    }
    
    @Input()
    set userId(value){
        this._userId = value;
        if(this._userId){
            this.userHttp.get(this._userId)
                .subscribe(user => this.userId = user);
        }
    }
    
    submit(){
        this.userHttp.update(this._userId, this.user)
            .subscribe((user) => {
                this.onSucess.emit(user);
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
