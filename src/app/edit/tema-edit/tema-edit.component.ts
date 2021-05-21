import { Tema } from './../../model/Tema';
import { environment } from './../../../environments/environment.prod';
import { AlertasService } from './../../service/alertas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TemaService } from './../../service/tema.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Seu token expirou, faça o login novamente.')
      this.router.navigate(['/login'])
    }
    let idTema = this.route.snapshot.params['id']
    this.findByIdTema(idTema)

  }

  atualizar(){
    this.temaService.putTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      this.alertas.showAlertSuccess('Tema Atualizado!')
      this.router.navigate(['/tema'])
    }, err =>{
      if(err.status == 400) {
        this.alertas.showAlertDanger('Esse tema não pode ser atualizado, pois já pertence a uma postagem')
        this.router.navigate(['/tema'])
      }
    })
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

}
