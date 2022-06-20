import { AlarmeListComponent } from './../main/components/crud-alarme/alarme-list/alarme-list.component';
import { AlarmeDetailComponent } from './../main/components/crud-alarme/alarme-detail/alarme-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: ':id', component: AlarmeDetailComponent },
  { path: '', component: AlarmeListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlarmeRoutingModule { }
