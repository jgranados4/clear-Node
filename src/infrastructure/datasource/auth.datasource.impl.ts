import { Hash } from "crypto";
import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongoDB";
import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      //
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest("Las credenciales no son correctas");
      //
      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password),
      });
      //
      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
