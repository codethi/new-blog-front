import { Router } from '@angular/router';
import { UserLogin } from './../model/UserLogin';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  //O Observable mapeia o retorno do médoto.
  logar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>(`${environment.server}/usuarios/logar`, userLogin)
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>(`${environment.server}/usuarios/cadastrar`, user)
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.server}/usuarios`, this.token)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`${environment.server}/usuarios/${id}`, this.token)
  }

  putUser(user: User) : Observable<User>{
    return this.http.put<User>(`${environment.server}/usuarios`, user, this.token)
  }

  menu(){
    let ok = false
    let rota = this.router.url
    if(environment.token != '' && rota.indexOf('user-edit') != 1 && rota.indexOf('tema') != 1){
      ok = true
    }
    return ok
  }

}
