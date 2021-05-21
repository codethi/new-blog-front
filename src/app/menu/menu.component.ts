import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  foto = environment.fotoUser
  nome = environment.nomeUser
  id = environment.idUser

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sair() {
    this.router.navigate(['/login'])
    environment.token = ''
    environment.fotoUser = ''
    environment.nomeUser = ''
    environment.tipoUser = ''
    environment.idUser = 0

    //localStorage.removeItem('token')
  }

}
