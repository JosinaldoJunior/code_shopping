import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductCategory } from '../../model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

  private baseApi = 'http://localhost:8000/api';
  private token   = window.localStorage.getItem('token');// Pega o token da API.
    
  constructor(private http: HttpClient) { }
  
  list(productId : number) : Observable<ProductCategory>{
      return this.http.
          get<{data: ProductCategory}>
          (this.getBaseUrl(productId), {
              headers: {
                  'Authorization' : `Bearer ${this.token}`
              }
          })
          .pipe(
              map(response => response.data)
          );
  }
  
  create(productId : number, categoriesId: number[]) : Observable<ProductCategory>{
      return this.http.
          post<{data: ProductCategory}>
          (this.getBaseUrl(productId), {categories: categoriesId},  {
              headers: {
                  'Authorization' : `Bearer ${this.token}`
              }
          })
          .pipe(
              map(response => response.data)
          );
  }
  
  private getBaseUrl(productId: number, categoryId: number = null) : string{
      let baseUrl =  `${this.baseApi}/products/${productId}/categories`;
      if(categoryId){
          baseUrl += `/${categoryId}`;
          //let vs const vs var
      }
      
      return baseUrl;
  }
  
}
