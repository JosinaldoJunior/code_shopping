import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { CategoryListComponent } from './category-list.component';

@Injectable({
    providedIn: 'root'
})

export class CategoryInsertService{
     
    private _categoryListComponent: CategoryListComponent;
    
    constructor(private notifyMessage: NotifyMessageService){ 
        
    }
    
    set categoryListComponent(value: CategoryListComponent){
        this._categoryListComponent = value;
    }
    
    showModalInsert(){
        this._categoryListComponent.categoryNewModal.showModal();
    }
    
    onInsertSucess($event: any){
        this.notifyMessage.success('Categoria cadastrada com sucesso!');
        console.log($event);
        this._categoryListComponent.getCategories();
    }

    onInsertError($event: HttpErrorResponse){
        console.log($event);
        this.notifyMessage.error('Erro ao cadastrar categoria!');
    }

}