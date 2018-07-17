import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { UserListComponent } from './user-list.component';

@Injectable({
    providedIn: 'root'
})

export class UserEditService{
     
    private _userListComponent: UserListComponent;
    
    constructor(private notifyMessage: NotifyMessageService){ 
        
    }
    
    set userListComponent(value: UserListComponent){
        this._userListComponent = value;
    }
    
    showModalEdit(userId: number){
        this._userListComponent.userId = userId;
        this._userListComponent.userEditModal.showModal();
    }
    
    onEditSucess($event: any){
        this.notifyMessage.notice('Usuário atualizado com sucesso!');
        console.log($event);
        this._userListComponent.getUsers();
    }

    onEditError($event: HttpErrorResponse){
        this.notifyMessage.error(`Não foi possível atualizar o usuário! 
        Tente novamente.`);
        console.log($event);
    }

}