import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductCategory } from '../../model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

  //private baseUrl = `http://localhost:8000/api/products/${productId}/categorie`;
  private token   = window.localStorage.getItem('token');// Pega o token da API.
    
  constructor(private http: HttpClient) { }
  
  list(productId : number) : Observable<ProductCategory>{
      
      return this.http.
          get<{data: ProductCategory}>
          (`http://localhost:8000/api/products/${productId}/categories` , {
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
          (`http://localhost:8000/api/products/${productId}/categories` , {categories: categoriesId},  {
              headers: {
                  'Authorization' : `Bearer ${this.token}`
              }
          })
          .pipe(
              map(response => response.data)
          );
  }
  
}
