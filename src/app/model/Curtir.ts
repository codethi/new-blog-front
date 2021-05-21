import { Postagem } from './Postagem';
import { User } from './User';
export class Curtir{
  public id: number
  public usuario: User
  public postagem: Postagem
  public curtida: boolean
}
