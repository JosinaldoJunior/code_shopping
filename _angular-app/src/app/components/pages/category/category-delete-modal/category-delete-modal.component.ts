import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrls: ['./category-delete-modal.component.css']
})
export class CategoryDeleteModalComponent implements OnInit {

  category = null;
  
  @Input()
  _categoryId: number;
  
  //Events
  @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
  
  @ViewChild(ModalComponent)
  modal: ModalComponent; 
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  
  @Input()
  set categoryId(value){
      this._categoryId = value;
      if(this._categoryId){
          const token = window.localStorage.getItem('token');// Pega o token da API.
          this.http.get<{data: any}>(`http://localhost:8000/api/categories/${value}`, { 
              headers: {
                  'Authorization' : `Bearer ${token}`
              }
          }).subscribe((response) => this.category = response.data);
      }
  }
  
  destroy(){
      const token = window.localStorage.getItem('token');// Pega o token da API.
      this.http
          .delete(`http://localhost:8000/api/categories/${this._categoryId}`, {
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
