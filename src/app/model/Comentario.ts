import { Postagem } from './Postagem';
import { User } from './User';

export class Comentario {
  public id: number
  public usuario: User
  public postagem: Postagem
  public comentario: string
  public data: Date
}
