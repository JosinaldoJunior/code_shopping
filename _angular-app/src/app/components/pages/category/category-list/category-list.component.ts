import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { CategoryNewModalComponent } from '../category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from '../category-delete-modal/category-delete-modal.component';
import { CategoryHttpService } from '../../../../services/http/category-http.service';
import { Category } from '../../../../model';
import { NotifyMessageService } from '../../../../services/notify-message.service';

declare let $;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    
  categories: Array<Category> = [];
  //categories: Array<{id: number, name: string, active: boolean, created_at: {date: string}}> = [];

  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent;
  
  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent;
  
  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent;
  
  categoryId: number;
  
  constructor(public categoryHttp: CategoryHttpService, private notifyMessage: NotifyMessageService) { 
//      console.log('construtor');
  }

  ngOnInit() {
      console.log('ngOnInit');
      this.getCategories();
  }
  
  getCategories(){
      this.categoryHttp.list()
          .subscribe(response => {
              //response.data[0].active = false;
              this.categories = response.data
          })
  }
  
  showModalInsert(){
      this.categoryNewModal.showModal();
  }
  
  showModalEdit(categoryId: number){
      this.categoryId =  categoryId;
      this.categoryEditModal.showModal();
  }
  
  showModalDelete(categoryId: number){
      this.categoryId =  categoryId;
      this.categoryDeleteModal.showModal();
  }
  
  onInsertSucess($event: any){
      this.notifyMessage.success('Categoria cadastrada com sucesso!');
      console.log($event);
      this.getCategories();
  }

  onInsertError($event: HttpErrorResponse){
      console.log($event);
      this.notifyMessage.error('Erro ao cadastrar categoria!');
  }
  
  onEditSucess($event: any){
      console.log($event);
      this.getCategories();
  }

  onEditError($event: HttpErrorResponse){
      console.log($event);
  }
  
  onDeleteSucess($event: any){
      console.log($event);
      this.getCategories();
  }

  onDeleteError($event: HttpErrorResponse){
      console.log($event);
//      if($event.status == 400){
//          this.notifyMessage.error(`Não foi possível excluir categoria! 
//                  Verifique se a mesma não está relacionada com produtos.`);
//      }
      
      this.notifyMessage.error(`Não foi possível excluir categoria! 
              Verifique se a mesma não está relacionada com produtos.`);
  }
  
}
