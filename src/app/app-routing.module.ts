import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';

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
    path: 'dashboard', loadChildren: () => import('./Pages/dashboard/dashboard.module').then(d => d.DashboardModule)
  },
  {
    path: 'sistema', loadChildren: () => import('./Pages/sistema/sistema.module').then(s => s.SistemaModule)
  },
  {
    path: 'categoria', loadChildren: () => import('./Pages/categoria/categoria.module').then(c => c.CategoriaModule)
  },
  {
    path: 'despesa', loadChildren: () => import('./Pages/despesa/despesa.module').then(d => d.DespesaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
