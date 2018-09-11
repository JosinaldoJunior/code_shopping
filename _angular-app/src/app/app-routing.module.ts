import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CategoryListComponent } from './components/pages/category/category-list/category-list.component';
import { ProductListComponent } from './components/pages/product/product-list/product-list.component';
import { ProductPhotoManagerComponent } from './components/pages/product-photo/product-photo-manager/product-photo-manager.component';
import { UserListComponent } from './components/pages/user/user-list/user-list.component';
import { ProductInputListComponent } from './components/pages/product-input/product-input-list/product-input-list.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductCategoryListComponent } from './components/pages/product-category/product-category-list/product-category-list.component';
import { ProductOutputListComponent } from './components/pages/product-output/product-output-list/product-output-list.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { ChatGroupListComponent } from './components/pages/chat-group/chat-group-list/chat-group-list.component';

//import { CommonModule } from '@angular/common'; //ngfor ngif, diretivas

const routes: Routes = [
                        { path: 'login', component: LoginComponent },
                        { path: 'categories/list', component: CategoryListComponent, canActivate: [AuthGuard] },
                        { path: 'users/list', component: UserListComponent, canActivate: [AuthGuard] },
                        { path: 'inputs/list', component: ProductInputListComponent, canActivate: [AuthGuard] },
                        { path: 'outputs/list', component: ProductOutputListComponent, canActivate: [AuthGuard] },
                        { path: 'products/:product/categories/list', component: ProductCategoryListComponent, canActivate: [AuthGuard] },
                        { path: 'products/:product/photos/manager', component: ProductPhotoManagerComponent, canActivate: [AuthGuard] },
                        { path: 'products/list', component: ProductListComponent, canActivate: [AuthGuard] },
                        { path: 'chat-groups/list', component: ChatGroupListComponent, canActivate: [AuthGuard] },
                        { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
                        { path: '', redirectTo: '/login', pathMatch: 'full' } //Defined PageDefault
                    ];

@NgModule({
  imports: [
   // CommonModule
   RouterModule.forRoot(routes, {enableTracing: true})
  ],
  declarations: [],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})

export class AppRoutingModule { }
