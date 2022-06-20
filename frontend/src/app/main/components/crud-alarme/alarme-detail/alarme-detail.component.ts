import { MedicamentoService } from './../../../../medicamento/services/medicamento.service';
import { Medicamento } from './../../../../medicamento/interfaces/medicamento';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular Material
import { MatIconRegistry } from '@angular/material/icon';

// Third-party
import { of, Subject, switchMap, takeUntil, Observable } from 'rxjs';

// Local
import { AlarmeService } from 'src/app/alarme/services/alarme.service';
import { Alarme } from 'src/app/alarme/interfaces/alarme';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alarme-detail',
  templateUrl: './alarme-detail.component.html',
  styleUrls: ['./alarme-detail.component.scss']
})
export class AlarmeDetailComponent implements OnInit, OnDestroy {

  icon: string;
  form: FormGroup;

  private _isDestroyed$: Subject<void>;
  private _createOrUpdateSubscription$: Subject<void>;
  private _deletedSubscription$: Subject<void>;
  public medicamentos$!: Observable<Medicamento[]>;

  private listaMedicamentos: Medicamento[] = [];

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private _alarmeService: AlarmeService,
    private _medicamentoService: MedicamentoService,
    private _iconRegistry: MatIconRegistry,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this._formBuilder.group({
      id: [],
      nome: [null, [Validators.required]],
      dataInicio: [null, [Validators.required]],
      usos: [null, [Validators.required]],
      intervalo: [null, [Validators.required]],
      medicamentoId: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],
      unidadeDeMedida: [null, [Validators.required]],
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

    let errorMsg = this.valoresValidos();
    if (this.form.valid && !errorMsg) {
      let obj: Alarme = this.form.value;
      let update: boolean;

      update = !!(obj.id);

      of(undefined).pipe(
        takeUntil(
          this._createOrUpdateSubscription$
        ),
        switchMap(() => {
          if (update) return this._alarmeService.patchAlarme(obj.id, obj);
          return this._alarmeService.postAlarme(obj);
        })
      ).subscribe({
        next: (value) => {
          if (update) {
            this.openSnackBar('Alarme atualizado com sucesso!');
            return;
          }
          this.openSnackBar('Alarme criado com sucesso!');
          this._router.navigate(['alarme']);
        },
        error: (error: HttpErrorResponse) => { this.openSnackBar('Erro ao salvar o alarme! Tente novamente mais tarde.'); }
      });
    }
    else {
      this.openSnackBar(errorMsg);
    }
  }

  valoresValidos(): string {
    let retorno = true;
    let obj = this.form.value;
    let medicamentoSelecionado: Medicamento = this.listaMedicamentos.find(med => med.id === obj.medicamentoId)!;
    if (obj.quantidade * obj.usos > medicamentoSelecionado?.dosesDisponiveis) return 'Quantidade de doses disponíveis insuficiente para o alarme periódico desejado!';
    return undefined!;
  }

  delete() {
    let obj: Alarme = this.form.value;
    let update: boolean;

    update = !!(obj.id);
    if (update) {
      of(undefined).pipe(
        takeUntil(
          this._deletedSubscription$
        ),
        switchMap(() => {
          return this._alarmeService.deleteAlarme(obj.id);
        })
      ).subscribe({
        next: () => {
          this.openSnackBar('Alarme excluído com sucesso!');
          this._router.navigate(['alarme']);
        },
        error: (error: HttpErrorResponse) => { this.openSnackBar('Erro ao excluir alarme! Tente novamente mais tarde.'); }
      });
    }
  }

  ngOnInit(): void {
    this._activatedRoute.params.pipe(
      takeUntil(this._isDestroyed$),
      switchMap((params: any) => {
        if (params.id) return this._alarmeService.getAlarme(params.id);
        return of();
      })
    ).subscribe({
      next: (value) => {
        if (value) {
          this.icon = 'edit';
          this.form.patchValue(value);
        }
      },
      error: (error) => {}
    });
    this.medicamentos$ = this._medicamentoService.getMedicamentos();
    this._medicamentoService.requestMedicamento();
    this.medicamentos$.subscribe(medicamentos => this.listaMedicamentos = medicamentos);
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
