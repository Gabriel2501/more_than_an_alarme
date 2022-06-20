import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Angular Material
import { MatIconRegistry } from '@angular/material/icon';

// Third-party
import { Observable } from 'rxjs';

// Local
import { rippleColor } from 'src/app/utils/constants/ripple-color';
import { MedicamentoService } from 'src/app/medicamento/services/medicamento.service';
import { Medicamento } from 'src/app/medicamento/interfaces/medicamento';


@Component({
  selector: 'app-medicamento-list',
  templateUrl: './medicamento-list.component.html',
  styleUrls: ['./medicamento-list.component.scss']
})
export class MedicamentoListComponent implements OnInit {

  rippleColor: string;
  medicamentos$!: Observable<Medicamento[]>;

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _medicamentoService: MedicamentoService,
    private _iconRegistry: MatIconRegistry,

  ) {
    this._sanitizeIcons();
    this.rippleColor = rippleColor;
  }


  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('add', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
  }

  onNavigate(to: number): void {
    if (to === -1) {
      this._router.navigate(['new', 'medicamento']);
      return;
    }

    this._router.navigate(['medicamento', to]);
  }

  ngOnInit(): void {
    this._medicamentoService.requestMedicamento();
    this.medicamentos$ = this._medicamentoService.getMedicamentos();
  }

}
