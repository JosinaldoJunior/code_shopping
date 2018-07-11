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

  variavel = 'Josinaldo';
  
  constructor(private http: HttpClient) { }
  
  list() : Observable<{data: Array<Category>}> {
      const token = window.localStorage.getItem('token');// Pega o token da API.
      return this.http.
          get<{data: Array<Category>}>
          ('http://localhost:8000/api/categories', {
              headers: {
                  'Authorization' : `Bearer ${token}`
              }
          });
  }
  
  get(id: number): Observable<Category> {
      const token = window.localStorage.getItem('token');// Pega o token da API.
      return this.http.
          get<{ data: Category }>
          (`http://localhost:8000/api/categories/${id}`, {
              headers: {
                  'Authorization' : `Bearer ${token}`
              }
          })
          .pipe(
              map(response => response.data )
          );//pipeline
  }
  
  create(){
      
  }
  
  update(){
      
  }
  
  //Não utilizar a palavra reservada delete
  destroy(){
      
  }
}
