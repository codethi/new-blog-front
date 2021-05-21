import { User } from './../model/User';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: User = new User()

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(){
  }

  findUserById(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User)=>{
      this.usuario = resp
    })
  }

}
