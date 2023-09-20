import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { AuthGuard } from './Pages/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: LoginComponent
  },
  {
    path: 'dashboard', loadChildren: () => import('./Pages/dashboard/dashboard.module').then(d => d.DashboardModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'sistema', loadChildren: () => import('./Pages/sistema/sistema.module').then(s => s.SistemaModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'categoria', loadChildren: () => import('./Pages/categoria/categoria.module').then(c => c.CategoriaModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'lancamento', loadChildren: () => import('./Pages/lancamento/lancamento.module').then(d => d.LancamentoModule),
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
