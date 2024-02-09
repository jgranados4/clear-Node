import { RegisterUserDto } from "../dtos/Auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource{


  abstract register(registerUserDto:RegisterUserDto):Promise<UserEntity>
}