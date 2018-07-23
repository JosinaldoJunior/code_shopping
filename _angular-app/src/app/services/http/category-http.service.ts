import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Category } from '../../model';
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { environment } from '../../../environments/environment';

//Design pattern - Singleton

@Injectable({
  providedIn: 'root' //Angular 6
})
export class CategoryHttpService implements HttpResource<Category>{

  private baseUrl = `${environment.api.url}/categories`;
  //private token   = window.localStorage.getItem('token');// Pega o token da API.
  
  constructor(private http: HttpClient) { }
  
  list(searchParams: SearchParams) : Observable<{data: Array<Category>, meta: any}> {
      
      const sParams = new SearchParamsBuilder(searchParams).makeObject();
      const params = new HttpParams({
          fromObject: (<any>sParams)
      });
      
      return this.http.
          get<{data: Array<Category>, meta: any}>
          (this.baseUrl , { params });
  }
  
  get(id: number): Observable<Category> {
      return this.http.
          get<{ data: Category }>
          (`${this.baseUrl}/${id}`)
          .pipe(
              map(response => response.data )
          );//pipeline
  }
  
  create(data: Category) : Observable<Category>{
      return this.http
          .post<{data: Category}>(this.baseUrl, data)
          .pipe(
              map(response => response.data )
          );//pipeline
  }
  
  update(id: number, data: Category) : Observable<Category>{
      return this.http
      .put<{data: Category}>(`${this.baseUrl}/${id}`, data)
      .pipe(
          map(response => response.data )
      );
  }
  
  //Não utilizar a palavra reservada delete
  destroy(id: number): Observable<any>{
      return this.http
      .delete(`${this.baseUrl}/${id}`);
  }
}
