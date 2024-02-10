import { LoginUserDto } from "../dtos/Auth/login-user.dto";
import { RegisterUserDto } from "../dtos/Auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
