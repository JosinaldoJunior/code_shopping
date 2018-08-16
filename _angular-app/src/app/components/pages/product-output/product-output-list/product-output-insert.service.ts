import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { ProductOutputListComponent } from './product-output-list.component';

@Injectable({
    providedIn: 'root'
})

export class ProductOutputInsertService{
     
    private _outputListComponent: ProductOutputListComponent;
    
    constructor(private notifyMessage: NotifyMessageService){ 
        
    }
    
    set outputListComponent(value: ProductOutputListComponent){
        this._outputListComponent = value;
    }
    
    showModalInsert(){
        this._outputListComponent.outputNewModal.showModal();
    }
    
    onInsertSucess($event: any){
        this.notifyMessage.success('Saída de produto cadastrada com sucesso!');
        console.log($event);
        this._outputListComponent.getOutputs();
    }

    onInsertError($event: HttpErrorResponse){
        console.log($event);
        this.notifyMessage.error('Erro ao cadastrar sáida de produto!');
    }

}