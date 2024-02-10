import { CustomError, LoginUserDto } from "../..";
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

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authResository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    // Crear usuario
    const user = await this.authResository.login(loginUserDto);

    // Token
    const token = await this.signToken({ id: user.id }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");

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
