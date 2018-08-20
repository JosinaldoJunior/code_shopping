import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductPhotoHttpService } from '../../../../services/http/product-photo-http.service';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-photo-delete-modal',
  templateUrl: './product-photo-delete-modal.component.html',
  styleUrls: ['./product-photo-delete-modal.component.css']
})
export class ProductPhotoDeleteModalComponent implements OnInit {

    errors = {};
    productId: number;
    @Input()
    photoId: number;
    
    //Events
    @ViewChild(ModalComponent) modal: ModalComponent;
    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
    
    constructor(public productPhotoHttp: ProductPhotoHttpService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
           this.productId = params.product;
        });
    }
    
    destroy(){
        this.productPhotoHttp.destroy(this.productId, this.photoId)
            .subscribe((data) => {
                this.onSuccess.emit(data);
                this.modal.hide();
            },
            (responseError) => {
                if(responseError.status === 422){
                    this.errors = responseError.error.errors;
                }
                this.onError.emit(responseError);
            });
    }
    
    showModal(){
        this.modal.show();
    }
    
    hideModal(){
        this.modal.hide();
    }
    
    showErrors(){
        return Object.keys(this.errors).length != 0;
    }

}
