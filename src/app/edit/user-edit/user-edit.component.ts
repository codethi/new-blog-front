import { User } from './../../model/User';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertasService } from './../../service/alertas.service';
import { AuthService } from './../../service/auth.service';
import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: User = new User()
  tipoUsuario: string
  confirmaSenha: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Seu token expirou, faça o login novamente.')
      this.router.navigate(['/login'])
    }

    let idUser = this.route.snapshot.params['id']
    this.findByIdUser(idUser)

  }

  findByIdUser(id: number){
    this.auth.getByIdUser(id).subscribe((resp: User)=>{
      this.usuario = resp
    })
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
    console.log(this.tipoUsuario)
  }

  confirmSenha(event: any) {
    this.confirmaSenha = event.target.value
  }

  atualizar() {
    this.usuario.tipo = this.tipoUsuario
    if (this.confirmaSenha != this.usuario.senha) {
      this.alertas.showAlertDanger('As senhas estão incorretas!')
    } else {
      this.auth.putUser(this.usuario).subscribe((resp: User) => {
        this.usuario = resp
        this.alertas.showAlertSuccess('Usuário atualizado, faça o login novamente.')
        environment.token = ''
        environment.fotoUser = ''
        environment.nomeUser = ''
        environment.tipoUser = ''
        environment.idUser = 0
        this.router.navigate(['/login'])
      })
    }
  }

}
