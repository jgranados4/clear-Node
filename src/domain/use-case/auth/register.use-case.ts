import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/Auth/register-user.dto";
import { AuthRepository } from "../../repositories/AuthRepository";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface RegisterUserUseCase {

  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authResository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}
  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    const user = await this.authResository.register(registerUserDto);
    //throw new Error("Method not implemented.");

    //return
    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
