import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Category } from '../../model';

//Design pattern - Singleton

@Injectable({
  providedIn: 'root' //Angular 6
})
export class CategoryHttpService {

  private baseUrl = 'http://localhost:8000/api/categories';
  private token   = window.localStorage.getItem('token');// Pega o token da API.
  
  constructor(private http: HttpClient) { }
  
  list() : Observable<{data: Array<Category>}> {
      return this.http.
          get<{data: Array<Category>}>
          (this.baseUrl , {
              headers: {
                  'Authorization' : `Bearer ${this.token}`
              }
          });
  }
  
  get(id: number): Observable<Category> {
      return this.http.
          get<{ data: Category }>
          (`${this.baseUrl}/${id}`, {
              headers: {
                  'Authorization' : `Bearer ${this.token}`
              }
          })
          .pipe(
              map(response => response.data )
          );//pipeline
  }
  
  create(data: Category) : Observable<Category>{
      return this.http
          .post<{data: Category}>(this.baseUrl, data, {
              headers: {
                  'Authorization' : `Bearer ${this.token}`
              }
          })
          .pipe(
              map(response => response.data )
          );//pipeline
//          .subscribe((category) => {
//              this.onSucess.emit(category);
//              this.modal.hide();
//              //this.getCategories();
//          }, error => this.onError.emit(error));
  }
  
  update(){
      
  }
  
  //Não utilizar a palavra reservada delete
  destroy(){
      
  }
}
