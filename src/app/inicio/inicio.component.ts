import { CurtirService } from './../service/curtir.service';
import { Curtir } from './../model/Curtir';
import { ComentarioService } from './../service/comentario.service';
import { Comentario } from './../model/Comentario';
import { AuthService } from './../service/auth.service';
import { User } from './../model/User';
import { Tema } from './../model/Tema';
import { TemaService } from './../service/tema.service';
import { Postagem } from './../model/Postagem';
import { PostagemService } from './../service/postagem.service';
import { AlertasService } from './../service/alertas.service';
import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  nomeTema: string = ''

  comentario: Comentario = new Comentario()
  listaComentarios: Comentario[]

  curtida: Curtir = new Curtir()
  listaCurtidas: Curtir[]

  user: User = new User()

  idUserLogado = environment.idUser
  fotoUserLogado = environment.fotoUser
  nomeUserLogado = environment.nomeUser

  key = 'data'
  reverse = true

  token = environment.token

  constructor(
    private router: Router,
    private alertas: AlertasService,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private comentarioService: ComentarioService,
    private curtirService: CurtirService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (this.token == '') {
      this.alertas.showAlertInfo('Seu token expirou, faça o login novamente.')
      this.router.navigate(['/login'])
    }

    this.findAllPostagens()
    this.findAllTemas()
    this.findByIdUser()
  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
      console.log(resp)
    }, err => {
      console.log(this.listaPostagens)
    })
  }

  findByIdUser() {
    this.authService.getByIdUser(environment.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findByNomeTema() {
    console.log(this.nomeTema)
    if (this.nomeTema == '') {
      this.findAllTemas()
    } else {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }

  findByTituloPostagem(){
    if(this.tituloPost == ''){
      this.findAllPostagens()
    } else {
      this.postagemService.getByNomePostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
        this.listaPostagens = resp
      })
    }

  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.user.id = environment.idUser
    this.postagem.usuario = this.user
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.findAllPostagens()
      this.findByIdUser()
      this.findAllTemas()
      this.postagem = new Postagem()
    }, err => {
      console.log(err)
    })
  }

  comentar(id: number){

    this.user.id = this.idUserLogado;
    this.comentario.usuario = this.user;

    this.postagem.id = id;
    this.comentario.postagem = this.postagem;

    this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
      this.comentario = resp
      this.alertas.showAlertSuccess('Comentário inserido com sucesso!');
      this.comentario = new Comentario();
      this.findAllPostagens();
    }, err => {
      console.log(this.comentario)
    })

  }

  findallComentarios(){
    this.comentarioService.getAllComentarios().subscribe((resp: Comentario[])=>{
      this.listaComentarios = resp
    })
  }

  curtir(id: number, event: any){
    let curtirLabel = document.querySelector(`label#labelCheck${id}`)
    let curtido = event.target.checked
    if(curtido){
      curtirLabel?.setAttribute('style', 'color: #007bff')
    } else {
      curtirLabel?.setAttribute('style', 'color: #6c757d')
    }

    this.curtida.curtida = curtido
    this.postagem.id = id
    this.curtida.postagem = this.postagem
    this.user.id = this.idUserLogado
    this.curtida.usuario = this.user

    console.log(this.curtida)

    if(curtido){
      this.curtirService.postCurtir(this.curtida).subscribe((resp: Curtir) => {
        this.curtida = resp
      })
    } else {
      this.curtirService.putCurtir(this.curtida).subscribe((resp: Curtir) => {
        this.curtida = resp
      })
    }


  }

}
