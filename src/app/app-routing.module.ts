import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginPanelGuard } from './guards/login-panel.guard';
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
        path: 'client',
        component: ClientComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
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
