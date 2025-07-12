import { Routes } from '@angular/router';
import { InicioComponent } from '../features/componentes/inicio/inicio.component';
import { SeleccionComponent } from '../features/componentes/seleccion/seleccion.component';
import { CampeonatoComponent } from '../features/componentes/campeonato/campeonato.component';

export const routes: Routes = [
    { path: "", redirectTo: "inicio", pathMatch: "full" },
    { path: "inicio", component: InicioComponent },
    { path: "selecciones", component: SeleccionComponent },
    { path: "campeonatos", component: CampeonatoComponent }
];
