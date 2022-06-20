import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular Material
import { MatIconRegistry } from '@angular/material/icon';

// Third-party
import { of, Subject, switchMap, takeUntil } from 'rxjs';

// Local
import { MedicamentoService } from 'src/app/medicamento/services/medicamento.service';
import { Medicamento } from 'src/app/medicamento/interfaces/medicamento';

@Component({
  selector: 'app-medicamento-detail',
  templateUrl: './medicamento-detail.component.html',
  styleUrls: ['./medicamento-detail.component.scss']
})
export class MedicamentoDetailComponent implements OnInit, OnDestroy {

  icon: string;
  form: FormGroup;

  private _isDestroyed$: Subject<void>;
  private _createOrUpdateSubscription$: Subject<void>;
  private _deletedSubscription$: Subject<void>;

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private _medicamentoService: MedicamentoService,
    private _iconRegistry: MatIconRegistry,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this._formBuilder.group({
      id: [],
      nome: [null, [Validators.required]],
      dosesDisponiveis: [null, [Validators.required]],
      vencimento: [null, [Validators.required]]
    });

    this.icon = 'add';
    this._sanitizeIcons();
    this._isDestroyed$ = new Subject();
    this._createOrUpdateSubscription$ = new Subject();
    this._deletedSubscription$ = new Subject();

  }
  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('add', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
    this._iconRegistry.addSvgIcon('edit', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'));
    this._iconRegistry.addSvgIcon('delete', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg'));
  }

  onSubmit(): void {

    if (this.form.valid) {
      let obj: Medicamento = this.form.value;
      let update: boolean;

      update = !!(obj.id);

      of(undefined).pipe(
        takeUntil(
          this._createOrUpdateSubscription$
        ),
        switchMap(() => {
          if (update) return this._medicamentoService.patchMedicamento(obj.id, obj);
          return this._medicamentoService.postMedicamento(obj);
        })
      ).subscribe({
        next: (value) => {
          if (update) {
            this.openSnackBar('Medicamento atualizado com sucesso!');
            return;
          }
          this.openSnackBar('Medicamento criado com sucesso!');
          this._router.navigate(['medicamento']);
        },
        error: (error: HttpErrorResponse) => { this.openSnackBar('Erro ao salvar medicamento! Tente novamente mais tarde.'); }
      });
    }
  }

  delete() {
    let obj: Medicamento = this.form.value;
    let update: boolean;

    update = !!(obj.id);
    if (update) {
      of(undefined).pipe(
        takeUntil(
          this._deletedSubscription$
        ),
        switchMap(() => {
          return this._medicamentoService.deleteMedicamento(obj.id);
        })
      ).subscribe({
        next: () => {
          this._router.navigate(['alarme']);
          this.openSnackBar('Medicamento excluído com sucesso!');
        },
        error: (error: HttpErrorResponse) => { this.openSnackBar('Erro ao excluir medicamento! Tente novamente mais tarde.'); }
      });
    }
  }

  ngOnInit(): void {
    this._activatedRoute.params.pipe(
      takeUntil(this._isDestroyed$),
      switchMap((params: any) => {
        if (params.id) return this._medicamentoService.getMedicamento(params.id);
        return of();
      })
    ).subscribe({
      next: (value) => {
        if (value) {
          this.icon = 'edit';
          this.form.patchValue(value);
        }
      },
      error: (error) => console.log(error)
    });
  }

  ngOnDestroy(): void {
    this._isDestroyed$.next();
    this._isDestroyed$.complete();
    this._createOrUpdateSubscription$.next();
    this._createOrUpdateSubscription$.complete();
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action || 'Ok');
  }
}
