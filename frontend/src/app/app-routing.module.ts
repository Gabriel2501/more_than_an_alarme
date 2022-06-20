import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'alarme', loadChildren: () => import('src/app/alarme/alarme.module').then(module => module.AlarmeModule) },
  { path: 'medicamento', loadChildren: () => import('src/app/medicamento/medicamento.module').then(module => module.MedicamentoModule) },
  { path: '', loadChildren: () => import('src/app/main/main.module').then(module => module.MainModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
