import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ClientesComponent } from './clientes/clientes.component';
import { TextBoxComponent } from './text-box/text-box.component';

const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full' 
},
  {
    path: 'table',
    component: TableComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'text-box',
    component: TextBoxComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
