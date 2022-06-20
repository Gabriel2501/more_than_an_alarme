import { AlarmeListComponent } from './components/crud-alarme/alarme-list/alarme-list.component';
import { AlarmeDetailComponent } from './components/crud-alarme/alarme-detail/alarme-detail.component';
import { MedicamentoListComponent } from './components/crud-medicamento/medicamento-list/medicamento-list.component';
import { MedicamentoDetailComponent } from './components/crud-medicamento/medicamento-detail/medicamento-detail.component';
import { HeaderComponent } from './../utils/components/header/header.component';
import { UtilsModule } from './../utils/utils.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule, MatOptionModule, MatNativeDateModule } from '@angular/material/core';

import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';
import { MainRoutingModule } from './main-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    AuthenticationComponent,
    RouteNotFoundComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    // Angular Material
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatRippleModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,

    // Local
    UtilsModule,
    MainRoutingModule
  ]
})
export class MainModule { }
