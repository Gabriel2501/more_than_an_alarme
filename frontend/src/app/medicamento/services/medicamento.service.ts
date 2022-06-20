import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Third-party
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

// Local
import { Medicamento } from '../interfaces/medicamento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService implements OnDestroy {

  private _errors$: BehaviorSubject<any>;
  private _medicamentos$: BehaviorSubject<Medicamento[]>;
  private _medicamentosSubscription$: Subject<void>;

  constructor(private _http: HttpClient) {
    this._medicamentosSubscription$ = new Subject();
    this._errors$ = new BehaviorSubject(undefined);
    this._medicamentos$ = new BehaviorSubject<Medicamento[]>([]);
   }

   medicamentosIsEmpty(): boolean {
    return !!(this._medicamentos$.value);
  }

  requestMedicamento(): void {
    this._medicamentosSubscription$.next();
    this._http.get<Medicamento[]>(`${environment.apiEndpoint}/medicamento/`).pipe(
      takeUntil(this._medicamentosSubscription$)
    ).subscribe({
      next: (value: Medicamento[]) => this._medicamentos$.next(value),
      error: (error: HttpErrorResponse) => this._errors$.next(error),
    });
  }

  getErrors(): Observable<any> {
    return this._errors$.asObservable();
  }

  getMedicamentos():Observable<Medicamento[]>{
    return this._medicamentos$.asObservable();
  }

  getMedicamento(id: number): Observable<Medicamento> {
    return this._http.get<Medicamento>(`${environment.apiEndpoint}/medicamento/${id}`);
  }

  postMedicamento(obj: any): Observable<any> {
    return this._http.post<any>(`${environment.apiEndpoint}/medicamento`, obj);
  }

  patchMedicamento(id: number, obj: any): Observable<any> {
    return this._http.patch(`${environment.apiEndpoint}/medicamento/${id}`, obj);
  }

  deleteMedicamento(id: number): Observable<any> {
    return this._http.delete(`${environment.apiEndpoint}/medicamento/${id}`);
  }

  ngOnDestroy(): void {
    this._medicamentosSubscription$.next();
    this._medicamentosSubscription$.complete();
  }
}
