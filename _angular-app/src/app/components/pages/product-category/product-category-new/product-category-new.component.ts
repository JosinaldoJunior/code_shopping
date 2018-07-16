import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Category, ProductCategory } from '../../../../model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductCategoryHttpService } from '../../../../services/http/product-category-http.service';
import { CategoryHttpService } from '../../../../services/http/category-http.service';
import { map } from 'rxjs/operators'; 

@Component({
  selector: 'product-category-new',
  templateUrl: './product-category-new.component.html',
  styleUrls: ['./product-category-new.component.css']
})
export class ProductCategoryNewComponent implements OnInit {

  categories: Category[] = [];
  categoriesId: number[] = [];

  @Input()
  productId: number;
  @Input()
  productCategory: ProductCategory = null;

  //Events
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productCategoryHttp: ProductCategoryHttpService,
              private categoryHttp: CategoryHttpService) { }

  ngOnInit() {
      this.getCategories();
  }
  
  change($event){
      console.log(this.categoriesId);
  }
  
  getCategories(){
      this.categoryHttp.list({all: 1})
      .subscribe(response => {
          console.log(response);
          //response.data[0].active = false;
          this.categories = response.data;
      })
  }
  
  submit(){
      const categoriesId = this.mergeCategories();
      this.productCategoryHttp
          .create(this.productId, categoriesId)
          .subscribe(productCategory => this.onSuccess.emit(productCategory),
                  error => this.onError.emit(error));
      return false;
  }
  
  private mergeCategories(): number[] {
          
      const categoriesId = this.productCategory.categories.map(category => category.id);
      const newCategoriesId = this.categoriesId.filter((category) => {
          return categoriesId.indexOf(category) == -1;
      });
      
      return categoriesId.concat(newCategoriesId);
  }

}
