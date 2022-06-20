import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from './../utils/utils.module';
import { MatOptionModule, MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MedicamentoListComponent } from './../main/components/crud-medicamento/medicamento-list/medicamento-list.component';
import { MedicamentoDetailComponent } from './../main/components/crud-medicamento/medicamento-detail/medicamento-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MedicamentoRoutingModule } from './medicamento-routing.module';


@NgModule({
  declarations: [
    MedicamentoDetailComponent,
    MedicamentoListComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Local
    UtilsModule,
    MedicamentoRoutingModule,

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
    MatDatepickerModule
  ]
})
export class MedicamentoModule { }
