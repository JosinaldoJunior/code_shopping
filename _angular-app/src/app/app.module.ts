import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { FormsModule } from '@angular/Forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
import { ProductCategoryListComponent } from './components/pages/product-category/product-category-list/product-category-list.component'

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'categories/list', component: CategoryListComponent },
    { path: 'products/:product/categories/list', component: ProductCategoryListComponent },
    { path: 'products/list', component: ProductListComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' } //Defined PageDefault
];

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
    ProductCategoryListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes, {enableTracing: true}) //enableTracing: Debug de routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//Multi Page Application - Http
//Single Page Application - SPA