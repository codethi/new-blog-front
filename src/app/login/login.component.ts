import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { UserLogin } from './../model/UserLogin';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  entrar(){
    this.auth.logar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp
      environment.fotoUser = this.userLogin.foto
      environment.nomeUser = this.userLogin.nome
      environment.tipoUser = this.userLogin.tipo
      environment.token = this.userLogin.token
      environment.idUser = this.userLogin.id

      //localStorage.setItem('token', this.userLogin.token)

      this.router.navigate(['/inicio'])
    })
  }



}
