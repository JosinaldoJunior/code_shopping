import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ProductOutput } from '../../model';
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { environment } from '../../../environments/environment';

//Design pattern - Singleton

@Injectable({
  providedIn: 'root' //Angular 6
})
export class ProductOutputHttpService {

  private baseUrl = `${environment.api.url}/outputs`;
  
  constructor(private http: HttpClient) { }
  
  list(searchParams: SearchParams) : Observable<{data: Array<ProductOutput>, meta: any}> {
      
      const sParams = new SearchParamsBuilder(searchParams).makeObject();
      const params = new HttpParams({
          fromObject: (<any>sParams)
      });
      
      return this.http.
          get<{data: Array<ProductOutput>, meta: any}>
          (this.baseUrl , { params });
  }
  
  get(id: number): Observable<ProductOutput> {
      return this.http.
          get<{ data: ProductOutput }>
          (`${this.baseUrl}/${id}`)
          .pipe(
              map(response => response.data )
          );//pipeline
  }
  
  create(data: {amount: number, product_id: number}) : Observable<ProductOutput>{
      return this.http
          .post<{data: ProductOutput}>(this.baseUrl, data)
          .pipe(
              map(response => response.data )
          );//pipeline
  }
  
}
