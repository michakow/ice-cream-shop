import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientComponent } from './client/client.component';
import { FlavorListAdminComponent } from './flavor-list-admin/flavor-list-admin.component';
import { FlavorListClientComponent } from './flavor-list-client/flavor-list-client.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginPanelGuard } from './guards/login-panel.guard';
import { UserRoleGuard } from './guards/user-role.guard';
import { HomeComponent } from './home/home.component';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { OrderListComponent } from './order-list/order-list.component';
import { UnitListComponent } from './unit-list/unit-list.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPanelComponent,
    canActivate: [LoginPanelGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminRoleGuard],
        children: [
          {
            path: 'clients',
            component: ClientListComponent,
          },
          {
            path: 'flavors',
            component: FlavorListAdminComponent,
          },
          {
            path: 'units',
            component: UnitListComponent,
          },
          {
            path: 'orders',
            component: OrderListComponent,
          },
        ],
      },
      {
        path: 'client',
        component: ClientComponent,
        canActivate: [UserRoleGuard],
        children: [
          {
            path: 'flavors',
            component: FlavorListClientComponent,
          },
          {
            path: 'order',
            component: ClientComponent,
          },
        ],
      },
    ],
  },
  {
    path: '',
    // redirectTo: 'login',
    component: FlavorListClientComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
