import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { ChatGroupListComponent } from './chat-group-list.component';

@Injectable({
    providedIn: 'root'
})

export class ChatGroupEditService{
     
    private _chatGroupListComponent: ChatGroupListComponent;
    
    constructor(private notifyMessage: NotifyMessageService){ 
        
    }
    
    set chatGroupListComponent(value: ChatGroupListComponent){
        this._chatGroupListComponent = value;
    }
    
    showModalEdit(chatGroupId: number){
        this._chatGroupListComponent.chatGroupId = chatGroupId;
        this._chatGroupListComponent.chatGroupEditModal.showModal();
    }
    
    onEditSucess($event: any){
        this.notifyMessage.success('Grupo atualizado com sucesso!');
        console.log($event);
        this._chatGroupListComponent.getChatGroups();
    }

    onEditError($event: HttpErrorResponse){
        this.notifyMessage.error(`Não foi possível atualizar o grupo! 
        Tente novamente.`);
        console.log($event);
    }

}