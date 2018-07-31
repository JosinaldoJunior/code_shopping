import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../../../../model';
import { FormControl } from '@angular/forms';
import { CategoryHttpService } from '../../../../services/http/category-http.service';

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {

  category: Category = {
          name: '',
          active: true
  };
  
  @ViewChild(ModalComponent)
  modal: ModalComponent;  
  
  //Events
  @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
    
  description: FormControl;
  
  constructor(private categoryHttp: CategoryHttpService) { 
      this.description = new FormControl();
  }

  ngOnInit() {
  }
  
  submit(){
      this.categoryHttp.create(this.category)
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
