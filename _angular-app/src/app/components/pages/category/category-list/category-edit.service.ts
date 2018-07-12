import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { CategoryListComponent } from './category-list.component';

@Injectable({
    providedIn: 'root'
})

export class CategoryEditService{
     
    private _categoryListComponent: CategoryListComponent;
    
    constructor(private notifyMessage: NotifyMessageService){ 
        
    }
    
    set categoryListComponent(value: CategoryListComponent){
        this._categoryListComponent = value;
    }
    
    showModalEdit(categoryId: number){
        this._categoryListComponent.categoryId = categoryId;
        this._categoryListComponent.categoryEditModal.showModal();
    }
    
    onEditSucess($event: any){
        this.notifyMessage.notice('Categoria atualizada com sucesso!');
        console.log($event);
        this._categoryListComponent.getCategories();
    }

    onEditError($event: HttpErrorResponse){
        this.notifyMessage.error(`Não foi possível atualizar a categoria! 
        Tente novamente.`);
        console.log($event);
    }

}