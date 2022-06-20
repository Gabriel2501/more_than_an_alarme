import { MedicamentoListComponent } from './components/crud-medicamento/medicamento-list/medicamento-list.component';
import { MedicamentoDetailComponent } from './components/crud-medicamento/medicamento-detail/medicamento-detail.component';
import { AlarmeListComponent } from './components/crud-alarme/alarme-list/alarme-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmeDetailComponent } from './components/crud-alarme/alarme-detail/alarme-detail.component';

// Local
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HomeComponent } from './components/home/home.component';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';

const routes: Routes = [
  { path: 'authentication', component: AuthenticationComponent },
  { path: '404', component: RouteNotFoundComponent },
  { path: 'new/alarme', component: AlarmeDetailComponent },
  { path: 'new/medicamento', component: MedicamentoDetailComponent },
  { path: 'alarme/:id', component: AlarmeDetailComponent },
  { path: 'medicamento/:id', component: MedicamentoDetailComponent },
  { path: 'alarme', component: AlarmeListComponent },
  { path: 'medicamento', component: MedicamentoListComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
