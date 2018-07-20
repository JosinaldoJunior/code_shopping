import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { FormsModule } from '@angular/Forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryListComponent } from './components/pages/category/category-list/category-list.component';
import { AlertErrorComponent } from './components/bootstrap/alert-error/alert-error.component';
import { ModalComponent } from './components/bootstrap/modal/modal.component';
import { CategoryNewModalComponent } from './components/pages/category/category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from './components/pages/category/category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from './components/pages/category/category-delete-modal/category-delete-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductListComponent } from './components/pages/product/product-list/product-list.component';
import { ProductEditModalComponent } from './components/pages/product/product-edit-modal/product-edit-modal.component';
import { ProductNewModalComponent } from './components/pages/product/product-new-modal/product-new-modal.component';
import { ProductDeleteModalComponent } from './components/pages/product/product-delete-modal/product-delete-modal.component';
import { NumberFormatBrPipe } from './pipes/number-format-br.pipe';
import { ProductViewModalComponent } from './components/pages/product/product-view-modal/product-view-modal.component';
import { ProductCategoryListComponent } from './components/pages/product-category/product-category-list/product-category-list.component';
import { ProductCategoryNewComponent } from './components/pages/product-category/product-category-new/product-category-new.component';
import { UserListComponent } from './components/pages/user/user-list/user-list.component';
import { UserEditModalComponent } from './components/pages/user/user-edit-modal/user-edit-modal.component';
import { UserNewModalComponent } from './components/pages/user/user-new-modal/user-new-modal.component';
import { UserDeleteModalComponent } from './components/pages/user/user-delete-modal/user-delete-modal.component'
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './components/bootstrap/navbar/navbar.component';
import { AuthGuard } from './guards/auth.guard';
import { RefreshTokenInterceptorService } from './services/refresh-token-interceptor.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'categories/list', component: CategoryListComponent, canActivate: [AuthGuard] },
    { path: 'users/list', component: UserListComponent, canActivate: [AuthGuard] },
    { path: 'products/:product/categories/list', component: ProductCategoryListComponent, canActivate: [AuthGuard] },
    { path: 'products/list', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' } //Defined PageDefault
];

function jwtFactory(authService: AuthService){
    return {
        whitelistedDomains: [   
             new RegExp('localhost:8000/*')
        ],
        tokenGetter: () => {
            return authService.getToken();
        }
    }
}

//ES7 - Java Script
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoryListComponent,
    AlertErrorComponent,
    ModalComponent,
    CategoryNewModalComponent,
    CategoryEditModalComponent,
    CategoryDeleteModalComponent,
    ProductListComponent,
    ProductEditModalComponent,
    ProductNewModalComponent,
    ProductDeleteModalComponent,
    NumberFormatBrPipe,
    ProductViewModalComponent,
    ProductCategoryListComponent,
    ProductCategoryNewComponent,
    UserListComponent,
    UserEditModalComponent,
    UserNewModalComponent,
    UserDeleteModalComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {enableTracing: true}), //enableTracing: Debug de routes
    NgxPaginationModule,
    JwtModule.forRoot({
        jwtOptionsProvider:{
            provide: JWT_OPTIONS,
            useFactory: jwtFactory,
            deps: [AuthService]
        }
    })
  ],
  providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: RefreshTokenInterceptorService,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//Multi Page Application - Http
//Single Page Application - SPA