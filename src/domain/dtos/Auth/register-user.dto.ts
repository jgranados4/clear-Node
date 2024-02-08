import { Validators } from "../../../config";

export class RegisterUserDto {
    private constructor(
      public id: string,
        public name: string,
        public email: string,
        public password: string,
    ) { }

    static create(object:{[key:string]:any}):[string?,RegisterUserDto?]{

      const {id,name,email,password}=object

      if(!name) return['name is required']
      if(!email) return['email is required']
      if (!Validators.email.test(email) ) return ["Email is not valid"];
      if(!password) return['password is required']
      if(password.length<6) return['password must be at least 6 characters']
      return[
        undefined,
        new RegisterUserDto(id,name,email,password)
      ];

    }
}