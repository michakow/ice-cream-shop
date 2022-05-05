import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginPanelGuard } from './guards/login-panel.guard';
import { UserRoleGuard } from './guards/user-role.guard';
import { HomeComponent } from './home/home.component';
import { LoginPanelComponent } from './login-panel/login-panel.component';

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
            component: AdminComponent,
          },
          {
            path: 'flavors',
            component: AdminComponent,
          },
          {
            path: 'orders',
            component: AdminComponent,
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
            component: ClientComponent,
          },
          {
            path: 'orders',
            component: ClientComponent,
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
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
