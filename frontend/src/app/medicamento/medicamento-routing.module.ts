import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentoDetailComponent } from '../main/components/crud-medicamento/medicamento-detail/medicamento-detail.component';
import { MedicamentoListComponent } from '../main/components/crud-medicamento/medicamento-list/medicamento-list.component';

const routes: Routes = [
  { path: ':id', component: MedicamentoDetailComponent },
  { path: '', component: MedicamentoListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicamentoRoutingModule { }
