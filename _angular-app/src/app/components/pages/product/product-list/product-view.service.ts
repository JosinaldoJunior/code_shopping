import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { ProductListComponent } from './product-list.component';

@Injectable({
    providedIn: 'root'
})

export class ProductViewService{
     
    private _productListComponent: ProductListComponent;
    
    constructor(private notifyMessage: NotifyMessageService){ 
        
    }
    
    set productListComponent(value: ProductListComponent){
        this._productListComponent = value;
    }
    
    showModalView(productId: number){
        this._productListComponent.productId = productId;
        this._productListComponent.productViewModal.showModal();
    }
    
    onViewError($event: HttpErrorResponse){
        this.notifyMessage.error(`Não foi possível consultar o produto!`);
        console.log($event);
    }

}