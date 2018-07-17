import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { UserListComponent } from './user-list.component';

@Injectable({
    providedIn: 'root'
})

export class UserInsertService{
     
    private _userListComponent: UserListComponent;
    
    constructor(private notifyMessage: NotifyMessageService){ 
        
    }
    
    set userListComponent(value: UserListComponent){
        this._userListComponent = value;
    }
    
    showModalInsert(){
        this._userListComponent.userNewModal.showModal();
    }
    
    onInsertSucess($event: any){
        this.notifyMessage.success('Usuário cadastrado com sucesso!');
        console.log($event);
        this._userListComponent.getUsers();
    }

    onInsertError($event: HttpErrorResponse){
        console.log($event);
        this.notifyMessage.error('Erro ao cadastrar usuário!');
    }

}