import { compareSync, hashSync} from 'bcryptjs'

export class BcryptAdapter{

  static hash(password:string):string{
    return hashSync(password);
  }
  static compare(password:string,hashed:string):boolean{
    return  compareSync(password,hashed);
  }
}

// const miFunccion=(password:string ,hashed:string)=>{
//   return true 
// }