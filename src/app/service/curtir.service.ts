import { Observable } from 'rxjs';
import { Curtir } from './../model/Curtir';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurtirService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllCurtir(): Observable<Curtir[]> {
    return this.http.get<Curtir[]>(`${environment.server}/curtidas`, this.token)
  }

  getByIdCurtir(id: number): Observable<Curtir>{
    return this.http.get<Curtir>(`${environment.server}/curtidas/${id}`, this.token)
  }

  postCurtir(curtir: Curtir): Observable<Curtir> {
    return this.http.post<Curtir>(`${environment.server}/curtidas`, curtir, this.token)
  }

  putCurtir(curtir: Curtir): Observable<Curtir>{
    return this.http.put<Curtir>(`${environment.server}/curtidas`, curtir, this.token)
  }

  deleteCurtir(id: number){
    return this.http.delete(`${environment.server}/curtidas/${id}`, this.token)
  }
}
