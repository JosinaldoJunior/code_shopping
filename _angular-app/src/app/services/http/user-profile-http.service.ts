import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { User } from '../../model';
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

interface Profile {
    name?: string;
    email?: string;
    password?: string;
    photo?: File | false | null;
    token?: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserProfileHttpService {

    private baseUrl = `${environment.api.url}/profile`;
    private token   = this.authService.getToken();// Pega o token da API.
    
    constructor(private http: HttpClient, private authService: AuthService) { }
    
    update(data: Profile) : Observable<{user: User, token: string}>{
        
        const formData = this.formDataToSend(data);
        
        return this.http
            .post<{user: User, token: string}>(this.baseUrl, formData)
            .pipe(
                tap(response => {
                    this.authService.setToken(response.token);
                })
            );
    }
    
    private formDataToSend(data) : FormData{
        const dataKeys = Object.keys(data);
        this.deletePhotoKey(dataKeys);
        
        const formData = new FormData();
        for(const key of dataKeys){
            if(data[key] !== ''  && data[key] !== null){
                formData.append(key, data[key])
            }
        }
        
        if(data.photo instanceof File){
            formData.append('photo', data.photo);
        }
        
        if(data.photo === null){
            formData.append('remove_photo', '1');
        }
        
        formData.append('_method', 'PATCH');
        return formData;
    }
    
    private deletePhotoKey(array){
        array.splice(array.indexOf('photo'), 1);
    }
    
}
