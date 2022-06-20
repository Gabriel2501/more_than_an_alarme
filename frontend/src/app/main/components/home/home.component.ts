import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Third-party
import { Subject, takeUntil } from 'rxjs';

//Angular material
import { MatIconRegistry } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

// Local
import { rippleColor } from 'src/app/utils/constants/ripple-color';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rippleColor!: string;
  actionsDirection: string;
  private _isDestroyed: Subject<void>;
  private _breakpoints: any[];

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _iconRegistry: MatIconRegistry,
    private _breakpointObserver: BreakpointObserver
  ) {
    this._breakpoints = [
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.WebLandscape
    ];
    this._isDestroyed = new Subject();
    this.rippleColor = rippleColor;
    this.actionsDirection = 'column';

    this._sanitizeIcons();
    this._layoutChange();
  }

  private _layoutChange(): void {
    this._breakpointObserver.observe(this._breakpoints).pipe(
      takeUntil(this._isDestroyed)
    ).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this._setActionsDirection(query);
        }
      }
    })
  }

  private _setActionsDirection(breakpoint: string): void {
    switch (breakpoint) {
      case Breakpoints.HandsetPortrait:
      case Breakpoints.HandsetLandscape:
        if (this.actionsDirection !== 'column') this.actionsDirection = 'column';
        break;
      default:
        if (this.actionsDirection !== 'row') this.actionsDirection = 'row';
        break
    }
  }

  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('alarm', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/alarm.svg'));
    this._iconRegistry.addSvgIcon('vaccines', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/vaccines.svg'));
  }

  onNavigate(to?: string): void {
    switch (to) {
      case 'alarme':
        this._router.navigate(['alarme']);
        break;
      case 'medicamento':
        this._router.navigate(['medicamento']);
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
  }

}
