import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../../../../model';
import { CategoryHttpService } from '../../../../services/http/category-http.service';

@Component({
  selector: 'category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {

  category: Category = {
          name: '',
          active: true
  };
  
  @Input()
  _categoryId: number;
  
  //Events
  @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
  
  @ViewChild(ModalComponent)
  modal: ModalComponent; 
  
  constructor(private http: HttpClient, private categoryHttp: CategoryHttpService) { }

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
  
  submit(){
      const token = window.localStorage.getItem('token');// Pega o token da API.
      this.http
          .put(`http://localhost:8000/api/categories/${this._categoryId}`, this.category, {
              headers: {
                  'Authorization' : `Bearer ${token}`
              }
          })
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
