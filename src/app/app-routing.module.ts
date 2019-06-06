import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [
  { path: '', redirectTo: 'funcionariosx', pathMatch: 'full' 
},
  {
    path: 'funcionariosx',
    component: FuncionariosComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
