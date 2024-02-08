import jwt from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolver) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) resolver(null);

        resolver(token!);
      });
    });
  }
  static ValidateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolver) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) resolver(null);
        resolver(decoded as T);
      });
    });
  }
}
