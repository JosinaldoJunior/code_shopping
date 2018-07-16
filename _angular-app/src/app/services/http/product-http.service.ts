import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Product } from '../../model';
import { HttpResource, SearchParams, SearchParamsBuilder} from './http-resource';

//Design pattern - Singleton

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product> {

    private baseUrl = 'http://localhost:8000/api/products';
    private token   = window.localStorage.getItem('token');// Pega o token da API.
    
    constructor(private http: HttpClient) { }
    
    list(searchParams: SearchParams) : Observable<{data: Array<Product>, meta: any}> {
        const sParams = new SearchParamsBuilder(searchParams).makeObject();
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        
        return this.http.
            get<{data: Array<Product>, meta: any}>
            (this.baseUrl , {
                params,
                headers: {
                    'Authorization' : `Bearer ${this.token}`
                }
            });
    }
    
    get(id: number): Observable<Product> {
        return this.http.
            get<{ data: Product }>
            (`${this.baseUrl}/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${this.token}`
                }
            })
            .pipe(
                map(response => response.data )
            );//pipeline
    }
    
    create(data: Product) : Observable<Product>{
        return this.http
            .post<{data: Product}>(this.baseUrl, data, {
                headers: {
                    'Authorization' : `Bearer ${this.token}`
                }
            })
            .pipe(
                map(response => response.data )
            );//pipeline
    }
    
    update(id: number, data: Product) : Observable<Product>{
        return this.http
        .put<{data: Product}>(`${this.baseUrl}/${id}`, data, {
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        })
        .pipe(
            map(response => response.data )
        );
    }
    
    //Não utilizar a palavra reservada delete
    destroy(id: number): Observable<any>{
        return this.http
        .delete(`${this.baseUrl}/${id}`, {
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        });
    }
}