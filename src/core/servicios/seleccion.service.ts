import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seleccion } from '../../shared/entidades/Seleccion';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}selecciones/`;
  }

  public listar(): Observable<Seleccion[]> {
    return this.http.get<Seleccion[]>(`${this.url}listar`);
  }

  public buscar(texto: string): Observable<Seleccion[]> {
    return this.http.get<Seleccion[]>(`${this.url}buscar/${texto}`);
  }

  public agregar(seleccion: Seleccion): Observable<Seleccion> {
    return this.http.post<Seleccion>(`${this.url}agregar`, seleccion);
  }

  public modificar(seleccion: Seleccion): Observable<Seleccion> {
    return this.http.put<Seleccion>(`${this.url}modificar`, seleccion);
  }


}
