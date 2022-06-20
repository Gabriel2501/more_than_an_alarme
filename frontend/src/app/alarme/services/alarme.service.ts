import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Third-party
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

// Local
import { Alarme } from '../interfaces/alarme';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlarmeService implements OnDestroy {

  private _errors$: BehaviorSubject<any>;
  private _alarmes$: BehaviorSubject<Alarme[]>;
  private _alarmesSubscription$: Subject<void>;

  constructor(private _http: HttpClient) {
    this._alarmesSubscription$ = new Subject();
    this._errors$ = new BehaviorSubject(undefined);
    this._alarmes$ = new BehaviorSubject<Alarme[]>([]);
   }

   alarmesIsEmpty(): boolean {
    return !!(this._alarmes$.value);
  }

  requestAlarme(): void {
    this._alarmesSubscription$.next();
    this._http.get<Alarme[]>(`${environment.apiEndpoint}/alarme/`).pipe(
      takeUntil(this._alarmesSubscription$)
    ).subscribe({
      next: (value: Alarme[]) => this._alarmes$.next(value),
      error: (error: HttpErrorResponse) => this._errors$.next(error),
    });
  }

  getErrors(): Observable<any> {
    return this._errors$.asObservable();
  }

  getAlarmes():Observable<Alarme[]>{
    return this._alarmes$.asObservable();
  }

  getAlarme(id: number): Observable<Alarme> {
    return this._http.get<Alarme>(`${environment.apiEndpoint}/alarme/${id}`);
  }

  postAlarme(obj: any): Observable<any> {
    return this._http.post<any>(`${environment.apiEndpoint}/alarme`, obj);
  }

  patchAlarme(id: number, obj: any): Observable<any> {
    return this._http.patch(`${environment.apiEndpoint}/alarme/${id}`, obj);
  }

  deleteAlarme(id: number): Observable<any> {
    return this._http.delete(`${environment.apiEndpoint}/alarme/${id}`);
  }

  ngOnDestroy(): void {
    this._alarmesSubscription$.next();
    this._alarmesSubscription$.complete();
  }
}
