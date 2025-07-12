import { Component, Inject } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { Campeonato } from '../../../shared/entidades/Campeonato';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Seleccion } from '../../../shared/entidades/Seleccion';
import { NgFor } from '@angular/common';

export interface DatosEdicionCampeonato {
  encabezado: string;
  campeonato: Campeonato;
  selecciones: Seleccion[];
}

@Component({
  selector: 'app-campeonato-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './campeonato-editar.component.html',
  styleUrl: './campeonato-editar.component.css'
})
export class CampeonatoEditarComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionCampeonato,
    public referenciaDialogo: MatDialogRef<CampeonatoEditarComponent>
  ) {
  }

  public cerrar() {
    this.referenciaDialogo.close();
  }

  public compararSelecciones(pais1: Seleccion, pais2: Seleccion): boolean {
    return pais1 && pais2 ? pais1.id == pais2.id : pais1 == pais2;
  }
}
