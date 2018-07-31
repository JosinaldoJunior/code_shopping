import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '../../../../model';
import { CategoryHttpService } from '../../../../services/http/category-http.service';

@Component({
  selector: 'category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrls: ['./category-delete-modal.component.css']
})
export class CategoryDeleteModalComponent implements OnInit {

  @Input()
  category: Category = null;
  
  @Input()
  _categoryId: number;
  
  //Events
  @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
  
  @ViewChild(ModalComponent)
  modal: ModalComponent; 
  
  constructor(private categoryHttp: CategoryHttpService) { }

  ngOnInit() {
  }
  
  @Input()
  set categoryId(value){
      this._categoryId = value;
      if(this._categoryId){
          this.categoryHttp.get(this._categoryId)
          .subscribe(category => this.category = category);
      }
  }
  
  destroy(){
      this.categoryHttp.destroy(this._categoryId)
          .subscribe((category) => {
              this.onSucess.emit(category);
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
