import { MedicamentoService } from 'src/app/medicamento/services/medicamento.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Angular Material
import { MatIconRegistry } from '@angular/material/icon';

// Third-party
import { Observable } from 'rxjs';

// Local
import { rippleColor } from 'src/app/utils/constants/ripple-color';
import { AlarmeService } from 'src/app/alarme/services/alarme.service';
import { Alarme } from 'src/app/alarme/interfaces/alarme';


@Component({
  selector: 'app-alarme-list',
  templateUrl: './alarme-list.component.html',
  styleUrls: ['./alarme-list.component.scss']
})
export class AlarmeListComponent implements OnInit {

  rippleColor: string;
  alarmes$!: Observable<Alarme[]>;

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _alarmeService: AlarmeService,
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
      this._router.navigate(['new', 'alarme']);
      return;
    }

    this._router.navigate(['alarme', to]);
  }

  ngOnInit(): void {
    this._alarmeService.requestAlarme();
    this.alarmes$ = this._alarmeService.getAlarmes();
  }

}
