import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/dashbord/home.component';
import { ProductComponent } from './component/product/product.component';
import { OrderComponent } from './component/order/order.component';
import { UsersComponent } from './component/users/users.component';
import { adminGuard } from './guard/gauth.guard';
import { AdminLayoutComponent } from './component/layouts/admin-layout/admin-layout.component';
import { CreatProductComponent } from './component/creat-product/creat-product.component';
import { UpdateProductComponent } from './component/update-product/update-product.component';
export const routes: Routes = [

  // 1️⃣ صفحة Login لوحدها
  { path: 'login', component: LoginComponent },

  // 2️⃣ الموقع كله (بعد Login)
  {
    path: '',
    canActivate: [adminGuard],
    component: AdminLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'product', component: ProductComponent },
      { path: 'order', component: OrderComponent },
      { path: 'users', component: UsersComponent },
      { path: 'creat-product', component: CreatProductComponent },
      { path: 'update-product/:id', component: UpdateProductComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
