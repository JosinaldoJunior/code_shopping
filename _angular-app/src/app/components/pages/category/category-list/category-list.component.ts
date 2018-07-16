import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { CategoryNewModalComponent } from '../category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from '../category-delete-modal/category-delete-modal.component';
import { CategoryHttpService } from '../../../../services/http/category-http.service';
import { Category } from '../../../../model';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { CategoryInsertService } from './category-insert.service';
import { CategoryEditService } from './category-edit.service';
import { CategoryDeleteService } from './category-delete.service';

declare let $;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    
  categories: Array<Category> = [];
  
  pagination = {
      page: 1,
      totalItems: 0,
      itemsPerPage: 15
  }

  //categories: Array<{id: number, name: string, active: boolean, created_at: {date: string}}> = [];

  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent;
  
  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent;
  
  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent;
  
  categoryId: number;
  
  constructor(private categoryHttp: CategoryHttpService, 
              private notifyMessage: NotifyMessageService,
              protected categoryInsertService: CategoryInsertService,
              protected categoryEditService: CategoryEditService,
              protected categoryDeleteService: CategoryDeleteService 
              ) { 
      this.categoryInsertService.categoryListComponent = this;
      this.categoryEditService.categoryListComponent = this;
      this.categoryDeleteService.categoryListComponent = this;
  }

  ngOnInit() {
      console.log('ngOnInit');
      this.getCategories();
  }
  
  getCategories(){
      this.categoryHttp.list({page: this.pagination.page})
          .subscribe(response => {
              console.log(response);
              //response.data[0].active = false;
              this.categories = response.data;
              this.pagination.totalItems = response.meta.total;
              this.pagination.itemsPerPage = response.meta.per_page;
          })
  }
  
  pageChanged(page){
      this.pagination.page = page;
      this.getCategories();
  }

}
