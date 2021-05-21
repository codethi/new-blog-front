import { HttpClient } from '@angular/common/http';
import { AlertasService } from './../service/alertas.service';
import { User } from './../model/User';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: User = new User()
  tipoUsuario: string
  confirmaSenha: string

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }


  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  confirmSenha(event: any){
    this.confirmaSenha = event.target.value
  }

  cadastrar(){
    this.usuario.tipo = this.tipoUsuario

    if(this.confirmaSenha != this.usuario.senha){
      this.alertas.showAlertDanger('As senhas estão incorretas!')
    } else {

      this.auth.cadastrar(this.usuario).subscribe((resp: User) => {
        this.usuario = resp
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
        this.router.navigate(['/login'])
      })


    }
  }

}
