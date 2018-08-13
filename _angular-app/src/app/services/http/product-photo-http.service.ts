import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Product, ProductPhoto } from '../../model';
import { HttpResource, SearchParams, SearchParamsBuilder} from './http-resource';
import { environment } from '../../../environments/environment';

//Design pattern - Singleton

@Injectable({
  providedIn: 'root'
})
export class ProductPhotoHttpService {

    private baseUrl = `${environment.api.url}`;
    private token   = window.localStorage.getItem('token');// Pega o token da API.
    
    constructor(private http: HttpClient) { }
    
    list(productId: number) : Observable<{product: Product, photos: ProductPhoto[]}> {
        return this.http.
            get<{data: any}>(this.getBaseUrl(productId))
            .pipe(
                    map(response => response.data)
            )
    }
    
    create(productId: number, files: FileList) : Observable <{product: Product, photos: ProductPhoto[]}>{
        const formData = new FormData();
        const filesArray = Array.from(files);
        
        filesArray.forEach((file) => {
            formData.append('photos[]', file);
        });
        
        return this.http.post<any>(this.getBaseUrl(productId), formData);
    }
    
    private getBaseUrl(productId: number, phototId: number = null): string{
        let baserUrl = `${this.baseUrl}/products/${productId}/photos`;
        if(phototId){
            baserUrl += `/${phototId}`;
        }
        
        return baserUrl;
    }
}