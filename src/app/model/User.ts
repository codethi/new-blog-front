import { Curtir } from './Curtir';
import { Comentario } from './Comentario';
import { Postagem } from './Postagem';
export class User{
  public id: number;
  public nome: string
  public usuario: string
  public senha: string
  public foto: string
  public tipo: string
  public postagem: Postagem[]
  public comentario: Comentario[]
  public curtida: Curtir[]
}
