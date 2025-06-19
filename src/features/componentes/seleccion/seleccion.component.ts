import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SeleccionService } from '../../../core/servicios/seleccion.service';
import { Seleccion } from '../../../shared/entidades/Seleccion';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionEditarComponent } from '../seleccion-editar/seleccion-editar.component';

@Component({
  selector: 'app-seleccion',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent {

  constructor(private servicioSeleccion: SeleccionService,
    private servicioDialogo: MatDialog
  ) {
    this.listar();
  }

  public selecciones: Seleccion[] = [];
  public columnas = [
    { prop: "nombre", name: "Nombre del Seleccionado" },
    { prop: "entidad", name: "Entidad regente del Fútbol" }
  ];
  public modoColumna = ColumnMode;

  public textoBusqueda: string = "";

  public listar() {
    this.servicioSeleccion.listar().subscribe({
      next: (response) => {
        this.selecciones = response;
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  public buscar() {
    if (this.textoBusqueda) {
      this.servicioSeleccion.buscar(this.textoBusqueda).subscribe({
        next: (response) => {
          this.selecciones = response;
        },
        error: (error) => {
          window.alert(error.message);
        }
      });
    }
    else {
      this.listar();
    }
  }

  public agregar() {
    const dialogo = this.servicioDialogo.open(SeleccionEditarComponent, {
      width: "500px",
      height: "300px",
      data: {
        encabezado: "Agregando nueva Selección de Fútbol",
        seleccion: {
          id: 0,
          nombre: "",
          entidad: ""
        }
      },
      disableClose: true
    });

    dialogo.afterClosed().subscribe({
      next: (seleccion) => {
        if (seleccion) {
          this.servicioSeleccion.agregar(seleccion).subscribe({
            next: (response) => {
              this.listar();
            },
            error: (error) => {
              window.alert(error.message);
            }
          });
        }
      },
      error: (error) => {
        window.alert(error);
      }
    });
  }

  public modificar() {

  }

  public eliminar() {

  }

}
