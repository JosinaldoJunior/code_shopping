import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatGroup } from '../../../../model';
import { ChatGroupHttpService } from '../../../../services/http/chat-group-http.service';

@Component({
  selector: 'chat-group-delete-modal',
  templateUrl: './chat-group-delete-modal.component.html',
  styleUrls: ['./chat-group-delete-modal.component.css']
})
export class ChatGroupDeleteModalComponent implements OnInit {

    @Input()
    chatGroup: ChatGroup = null;
    
    @Input()
    _chatGroupId: number;
    
    //Events
    @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
    
    @ViewChild(ModalComponent)
    modal: ModalComponent; 
    
    constructor(private chatGroupHttp: ChatGroupHttpService) { }

    ngOnInit() {
    }
    
    @Input()
    set chatGroupId(value){
        this._chatGroupId = value;
        if(this._chatGroupId){
            this.chatGroupHttp.get(this._chatGroupId)
            .subscribe(chatGroup => this.chatGroup = chatGroup);
        }
    }
    
    destroy(){
        this.chatGroupHttp.destroy(this._chatGroupId)
            .subscribe((chatGroup) => {
                this.onSucess.emit(chatGroup);
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

}
