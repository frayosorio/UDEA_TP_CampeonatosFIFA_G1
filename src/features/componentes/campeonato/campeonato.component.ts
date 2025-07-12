import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Campeonato } from '../../../shared/entidades/Campeonato';
import { MatDialog } from '@angular/material/dialog';
import { CampeonatoService } from '../../../core/servicios/campeonato.service';
import { CampeonatoEditarComponent } from '../campeonato-editar/campeonato-editar.component';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';
import { FormsModule } from '@angular/forms';
import { Seleccion } from '../../../shared/entidades/Seleccion';
import { SeleccionService } from '../../../core/servicios/seleccion.service';

@Component({
  selector: 'app-campeonato',
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    FormsModule
  ],
  templateUrl: './campeonato.component.html',
  styleUrl: './campeonato.component.css'
})
export class CampeonatoComponent {

  public campeonatos: Campeonato[] = [];
  public selecciones: Seleccion[] = [];

  public columnas = [
    { prop: "nombre", name: "Nombre del Campeonato" },
    { prop: "año", name: "Año" },
    { prop: "paisOrganizador.nombre", name: "País Organizador" }
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  private CampeonatoEscogido: Campeonato | undefined;

  public textoBusqueda: string = "";

  constructor(private servicioCampeonato: CampeonatoService,
    private servicioSeleccion: SeleccionService,
    private servicioDialogo: MatDialog
  ) {
    this.listar();
    this.listarSelecciones();
  }

  public escoger(evt: any) {
    if (evt.type == "click") {
      this.CampeonatoEscogido = evt.row;
    }
  }

  public listar() {
    this.servicioCampeonato.listar().subscribe({
      next: (response) => {
        this.campeonatos = response;
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  public listarSelecciones() {
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
      this.servicioCampeonato.buscar(this.textoBusqueda).subscribe({
        next: (response) => {
          this.campeonatos = response;
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
    const dialogo = this.servicioDialogo.open(CampeonatoEditarComponent, {
      width: "500px",
      height: "400px",
      data: {
        encabezado: "Agregando nuevo Campeonato de Fútbol",
        campeonato: {
          id: 0,
          nombre: "",
          año: new Date().getFullYear(),
          paisOrganizador: {
            id: 0,
            nombre: "",
            entidad: ""
          }
        },
        selecciones: this.selecciones
      },
      disableClose: true
    });

    dialogo.afterClosed().subscribe({
      next: (campeonato) => {
        if (campeonato) {
          campeonato.año = campeonato.year;
          this.servicioCampeonato.agregar(campeonato).subscribe({
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
    if (this.CampeonatoEscogido) {
      this.CampeonatoEscogido.year = this.CampeonatoEscogido.año;
      const dialogo = this.servicioDialogo.open(CampeonatoEditarComponent, {
        width: "500px",
        height: "400px",
        data: {
          encabezado: `Editando Campeonato de Fútbol [${this.CampeonatoEscogido?.nombre}]`,
          campeonato: this.CampeonatoEscogido,
          selecciones: this.selecciones
        },
        disableClose: true
      });

      dialogo.afterClosed().subscribe({
        next: (campeonato) => {
          if (campeonato) {
            campeonato.año = campeonato.year;
            this.servicioCampeonato.modificar(campeonato).subscribe({
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
    else {
      window.alert("Debe escoger un campeonato de fútbol");
    }
  }

  public eliminar() {
    if (this.CampeonatoEscogido) {
      const dialogo = this.servicioDialogo.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          mensaje: `¿Está seguro de eliminar el campeonato [${this.CampeonatoEscogido?.nombre}] ?`,
          id: this.CampeonatoEscogido.id
        },
        disableClose: true
      });

      dialogo.afterClosed().subscribe({
        next: (id) => {
          if (id) {
            this.servicioCampeonato.eliminar(id).subscribe({
              next: (response) => {
                if (response) {
                  this.listar();
                }
                else {
                  window.alert("El registro no se pudo eliminar");
                }
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
    else {
      window.alert("Debe escoger un campeonato de fútbol");
    }
  }


}
