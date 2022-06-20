import { MatSnackBar } from '@angular/material/snack-bar';
import { Medicamento } from './medicamento/interfaces/medicamento';
import { MedicamentoService } from 'src/app/medicamento/services/medicamento.service';
import { Alarme } from 'src/app/alarme/interfaces/alarme';
import { AlarmeService } from 'src/app/alarme/services/alarme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  alarmes: Alarme[] = [];
  medicamentos: Medicamento[] = [];
  constructor(
    private _alarmeService: AlarmeService,
    private _medicamentoService: MedicamentoService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._medicamentoService.requestMedicamento();
    this._alarmeService.requestAlarme();

    this._medicamentoService.getMedicamentos().subscribe(medicamentos => {
      this.medicamentos = medicamentos;

      this._alarmeService.getAlarmes().subscribe(alarmes => {
        this.alarmes = alarmes;
        this.alarmes.map(alarme => {
          let avisos = [];
          let dataHora = new Date(alarme.dataInicio);
          dataHora.setSeconds(0, 0);
          avisos.push(dataHora);
          for (let i = 0; i < alarme.usos; i++) {
            dataHora = new Date(dataHora.getTime() + (alarme.intervalo * 1000 * 60 * 60));
            dataHora.setSeconds(0, 0);
            avisos.push(dataHora);
          }
          alarme.avisos = avisos;
          alarme.medicamento = this.medicamentos.find(med => med.id === alarme.medicamentoId);
          return alarme;
        });
      });
    });

    setInterval(() => {
      let agora = new Date();
      agora.setSeconds(0, 0);
      this.alarmes.forEach(alarme => {
        console.log(agora);
        console.log(alarme.avisos);
        if (alarme.avisos?.find(aviso => aviso.getTime() === agora.getTime())) {
          this._snackBar.open(`Alarme: ${alarme.medicamento?.nome} - ${alarme.quantidade} ${alarme.unidadeDeMedida}`, 'Ok');
        }
      });
    }, 60000);
  }
}
