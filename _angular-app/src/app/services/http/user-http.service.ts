import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { User } from '../../model';
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserHttpService {

    private baseUrl = `${environment.api.url}/users`;
    private token   = this.authService.getToken();// Pega o token da API.
    
    constructor(private http: HttpClient, private authService: AuthService) { }
    
    list(searchParams: SearchParams) : Observable<{data: Array<User>, meta: any}> {
        
        const sParams = new SearchParamsBuilder(searchParams).makeObject();
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        
        return this.http.
            get<{data: Array<User>, meta: any}>
            (this.baseUrl , {
                params,
                headers: {
                    'Authorization' : `Bearer ${this.token}`
                }
            });
    }
    
    get(id: number): Observable<User> {
        return this.http.
            get<{ data: User }>
            (`${this.baseUrl}/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${this.token}`
                }
            })
            .pipe(
                map(response => response.data )
            );//pipeline
    }
    
    create(data: User) : Observable<User>{
        return this.http
            .post<{data: User}>(this.baseUrl, data, {
                headers: {
                    'Authorization' : `Bearer ${this.token}`
                }
            })
            .pipe(
                map(response => response.data )
            );//pipeline
    }
    
    update(id: number, data: User) : Observable<User>{
        return this.http
        .put<{data: User}>(`${this.baseUrl}/${id}`, data, {
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
