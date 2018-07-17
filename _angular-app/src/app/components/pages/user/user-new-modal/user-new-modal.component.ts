import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../../model';
import { UserHttpService } from '../../../../services/http/user-http.service';

@Component({
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {

    user: User = {
            name: '',
            email: ''
    };
    
    @ViewChild(ModalComponent)
    modal: ModalComponent;  
    
    //Events
    @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
      
    constructor(private userHttp: UserHttpService) { }

    ngOnInit() {
    }
    
    submit(){
        this.userHttp.create(this.user)
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
