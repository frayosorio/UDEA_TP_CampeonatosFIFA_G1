import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Campeonato } from '../../shared/entidades/Campeonato';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}campeonatos/`;
  }

  public listar(): Observable<Campeonato[]> {
    return this.http.get<Campeonato[]>(`${this.url}listar`);
  }

  public buscar(texto: string): Observable<Campeonato[]> {
    return this.http.get<Campeonato[]>(`${this.url}buscar/${texto}`);
  }

  public agregar(Campeonato: Campeonato): Observable<Campeonato> {
    return this.http.post<Campeonato>(`${this.url}agregar`, Campeonato);
  }

  public modificar(Campeonato: Campeonato): Observable<Campeonato> {
    return this.http.put<Campeonato>(`${this.url}modificar`, Campeonato);
  }

  public eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminar/${id}`);
  }
}
